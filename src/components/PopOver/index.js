import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { themes, constants, spacing } from "../../theme";
import { popContainersBoxShadow } from "../../theme/constants";

const StyledPopOver = styled.div`
  background-color: ${themes.global.white.base};
  border: 1px solid ${themes.global.gray02};
  border-radius: ${constants.borderRadius.large};
  box-shadow: ${popContainersBoxShadow};
  position: absolute;
  max-width: 260px;
  padding: ${spacing.moderate};
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  transition: opacity 0.1s ${constants.easing.easeInQuad},
    transform 0.1s ${constants.easing.easeInQuad};

  &.open-enter {
    transition: opacity 0.3s ${constants.easing.easeInOutQuad};
    display: block;
    opacity: 0;
    transform: scale(0.7);
  }

  &.open-enter-active {
    transition: opacity 0.3s ${constants.easing.easeInOutQuad},
      transform 0.3s ${constants.easing.easeInOutQuad};
    display: block;
    opacity: 1;
    transform: scale(1);
  }

  &.open-enter-done {
    transition: opacity 0.3s ${constants.easing.easeInOutQuad},
      transform 0.3s ${constants.easing.easeInOutQuad};
    display: block;
    opacity: 1;
    transform: scale(1);
  }

  &.open-exit {
    display: block;
    opacity: 1;
    transform: scale(1);
  }

  &.open-exit-active {
    display: block;
    opacity: 0;
    transform: scale(0.7);
  }
`;

const MIN_SPACE_FROM_EDGE = 24;
const MOBILE_MIN_SPACE_FROM_EDGE = 16;
const MOBILE_MAX_WIDTH = 767;
const SPACE_FROM_MOUSE = 10;

class PopOver extends Component {
  /*
   * Static function that needs to be called from the parent -> PopOver.getDimensionsFromEvent
   * The parent should pass the click event which will trigger showing the PopOver.
   * By default the PopOver is shown withing the view port. If we need to show it inside
   * certain element we should pass the html element as second parameter.
   * The function will return an object that should be provided to the PopOver as props.
   */
  static getDimensionsFromEvent(e, parent = {}) {
    const { clientX: mouseX } = e;
    const { offsetTop: elTop, clientHeight: elHeight } = e.currentTarget;
    const {
      offsetTop: offsetTop = 0,
      clientHeight: clientHeight = 100000,
      offsetLeft: offsetLeft = 0,
      clientWidth: clientWidth = 100000
    } = parent;

    return {
      mouseX,
      elTop,
      elBottom: elTop + elHeight,
      offsetTop,
      clientHeight,
      offsetLeft,
      clientWidth
    };
  }

  /*
   * Static function that determines PopOver position.
   * @position(object) - top and bottom position of the elemt that triggers showing PopOver;
   * Mouse horizontal position on the sreen - so we can center the PopOver;
   * Additional container position and size
   * @dimensions(object) - PopOver width and height;
   * Page scroll position
   * Viewport size
   * @reduce(object) - additional top/bottom screen reduction cause by sticky header/footer
   */
  static calculatePosition(position, dimensions, reduce) {
    const {
      width,
      windowScroll,
      height,
      windowWidth,
      windowHeight
    } = dimensions;
    const { top: reduceTop, bottom: reduceBottom } = reduce;
    const {
      elBottom,
      elTop,
      mouseX,
      offsetTop,
      clientHeight,
      offsetLeft,
      clientWidth
    } = position;

    const viewportTop = windowScroll + reduceTop;
    const viewportBottom = windowScroll + windowHeight - reduceBottom;
    const bottomPosition = elBottom + SPACE_FROM_MOUSE;
    const topPosition = elTop - SPACE_FROM_MOUSE - height;

    const spaceFromEdge =
      windowWidth > MOBILE_MAX_WIDTH
        ? MIN_SPACE_FROM_EDGE
        : MOBILE_MIN_SPACE_FROM_EDGE;

    const containerTop = offsetTop + spaceFromEdge;
    const containerBottom = offsetTop + clientHeight - spaceFromEdge;
    const containerLeft = offsetLeft + spaceFromEdge;
    const containerRight = offsetLeft + clientWidth - spaceFromEdge - width;

    const topPositionWithFallback =
      topPosition - spaceFromEdge >= Math.max(viewportTop, containerTop)
        ? topPosition
        : bottomPosition;

    return {
      x: Math.min(
        Math.max(0 + spaceFromEdge, mouseX - width / 2, containerLeft),
        windowWidth - spaceFromEdge - width,
        containerRight
      ),
      y:
        bottomPosition + height + spaceFromEdge <=
        Math.min(viewportBottom, containerBottom)
          ? bottomPosition
          : topPositionWithFallback
    };
  }

  constructor(props) {
    super(props);

    this.dimensions = {
      width: 0,
      height: 0,
      windowScroll: 0,
      windowWidth: 0,
      windowHeight: 0
    };

    this.myRef = React.createRef();

    this.pos = {
      x: 0,
      y: 0
    };
  }

  componentDidUpdate(prevProps) {
    /*
     * This causes force update of the popover position if we use only one popover and we transiotion from
     * one zone that triggers the popover to another that triggers the same popover but with different place to display
     */
    const {
      position: { mouseX, elTop, elBottom },
      isVisible,
      position,
      reduceTop,
      reduceBottom
    } = this.props;

    if (
      (prevProps.position.mouseX !== mouseX ||
        prevProps.position.elTop !== elTop ||
        prevProps.position.elBottom !== elBottom) &&
      isVisible &&
      prevProps.isVisible === isVisible
    ) {
      this.setDimensions();
      this.pos = PopOver.calculatePosition(position, this.dimensions, {
        top: reduceTop,
        bottom: reduceBottom
      });

      this.myRef.current.style.top = `${this.pos.y}px`;
      this.myRef.current.style.left = `${this.pos.x}px`;
    }
  }

  setDimensions = () => {
    const { isVisible } = this.props;
    const {
      windowScroll,
      windowWidth,
      windowHeight,
      width,
      height
    } = this.dimensions;
    const dimensions = {};
    if (global.window && isVisible) {
      const {
        scrollTop,
        clientWidth,
        clientHeight
      } = global.window.document.documentElement;

      if (scrollTop !== windowScroll) {
        dimensions.windowScroll = scrollTop;
      }

      if (clientWidth !== windowWidth) {
        dimensions.windowWidth = clientWidth;
      }

      if (clientHeight !== windowHeight) {
        dimensions.windowHeight = clientHeight;
      }
    }

    if (this.myRef.current) {
      const { clientWidth, clientHeight } = this.myRef.current;

      if (width !== clientWidth && clientWidth) {
        dimensions.width = clientWidth;
      }

      if (height !== clientHeight && clientHeight) {
        dimensions.height = clientHeight;
      }
    }

    if (
      Object.keys(dimensions).length &&
      dimensions.width &&
      dimensions.height
    ) {
      this.dimensions = {
        ...this.dimensions,
        ...dimensions
      };
      return true;
    }

    return false;
  };

  popoverEnter = () => {
    const { isVisible, position, reduceTop, reduceBottom } = this.props;

    if (isVisible) {
      this.setDimensions();
      this.pos = PopOver.calculatePosition(position, this.dimensions, {
        top: reduceTop,
        bottom: reduceBottom
      });
    }

    this.myRef.current.style.top = `${this.pos.y}px`;
    this.myRef.current.style.left = `${this.pos.x}px`;
  };

  render() {
    const { children, isVisible } = this.props;

    return (
      <CSSTransition
        in={isVisible}
        key="popover-animation"
        timeout={300}
        classNames="open"
        onEnter={this.popoverEnter}
      >
        <StyledPopOver innerRef={this.myRef} isVisible={isVisible}>
          {children}
        </StyledPopOver>
      </CSSTransition>
    );
  }
}

PopOver.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  reduceTop: PropTypes.number,
  reduceBottom: PropTypes.number,
  position: PropTypes.shape({
    mouseX: PropTypes.number,
    elTop: PropTypes.number,
    elBottom: PropTypes.number,
    offsetTop: PropTypes.number,
    clientHeight: PropTypes.number,
    offsetLeft: PropTypes.number,
    clientWidth: PropTypes.number
  })
};

PopOver.defaultProps = {
  isVisible: false,
  reduceTop: 0,
  reduceBottom: 0,
  position: {
    mouseX: 0,
    elTop: 0,
    elBottom: 0,
    offsetTop: 0,
    clientHeight: 0,
    offsetLeft: 0,
    clientWidth: 0
  }
};

PopOver.displayName = "PopOver";

export default PopOver;
