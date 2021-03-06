import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { spacing, colors, constants } from "../../theme";
import {
  xSmallAndDown,
  smallAndUp,
  mediumAndUp,
  largeAndUp
} from "../../theme/mediaQueries";
import Column from "../Grid/Column";

const SHADOW_OFFSET_X = "0 16px 16px 0 rgba(0, 0, 0, 0.06)";
const SHADOW_OFFSET_Y = "0 0 16px 0 rgba(0, 0, 0, 0.12)";

export const ModalContainer = styled(Column)`
  position: relative;
  background-color: ${colors.white.base};
  padding: 0;

  ${xSmallAndDown`
    height: 100vh;
  `};

  ${smallAndUp`
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    max-height: calc(100vh - 88px * 2);

    border-radius: ${constants.borderRadius.large};
    overflow: hidden;

    box-shadow: ${SHADOW_OFFSET_X}, ${SHADOW_OFFSET_Y};
  `};
`;

const actionBarGutters = css`
  ${xSmallAndDown`
    padding: ${spacing.gutters.small}px;
  `};

  ${smallAndUp`
    padding: ${spacing.gutters.small}px;
    padding-bottom: 16px;
  `};

  ${mediumAndUp`
    padding: ${spacing.gutters.mediumAndUp}px;
    padding-bottom: 16px;
  `};

  ${largeAndUp`
    padding: ${spacing.gutters.largeAndUp}px;
    padding-bottom: 16px;
  `};
`;

export const ActionBar = styled.div`
  position: relative;
  box-shadow: ${({ shadow }) =>
    shadow ? `${SHADOW_OFFSET_X}, ${SHADOW_OFFSET_Y}` : "none"};

  ${({ gutters }) => (gutters ? actionBarGutters : "")};
`;

ActionBar.propTypes = {
  gutters: PropTypes.bool.isRequired
};

const contentGutters = css`
  ${xSmallAndDown`
    padding-left: ${spacing.gutters.small}px;
    padding-right: ${spacing.gutters.small}px;
  `};

  ${smallAndUp`
    padding-left: ${spacing.gutters.small}px;
    padding-right: ${spacing.gutters.small}px;
  `};

  ${mediumAndUp`
    padding-left: ${spacing.gutters.mediumAndUp}px;
    padding-right: ${spacing.gutters.mediumAndUp}px;
  `};

  ${largeAndUp`
    padding-left: ${spacing.gutters.largeAndUp}px;
    padding-right: ${spacing.gutters.largeAndUp}px;
  `};
`;

export const ModalContent = styled.div`
  background-color: ${colors.white.base};
  overflow-y: scroll;

  ${({ gutters }) => (gutters ? contentGutters : "")};
`;

ModalContent.propTypes = {
  gutters: PropTypes.bool.isRequired
};

const bottomActionBarGutters = css`
  ${xSmallAndDown`
    padding: ${spacing.gutters.small}px;
  `};

  ${smallAndUp`
    padding: ${spacing.gutters.small}px;
  `};

  ${mediumAndUp`
    padding: ${spacing.gutters.mediumAndUp}px;
  `} ${largeAndUp`
    padding: ${spacing.gutters.largeAndUp}px;
    padding-top: 24px;
  `};
`;

export const BottomActionBar = styled.div`
  position: relative;
  box-shadow: ${({ shadow }) =>
    shadow ? `${SHADOW_OFFSET_X}, ${SHADOW_OFFSET_Y}` : "none"};

  ${({ gutters }) => (gutters ? bottomActionBarGutters : "")};
`;

BottomActionBar.propTypes = {
  gutters: PropTypes.bool.isRequired
};
