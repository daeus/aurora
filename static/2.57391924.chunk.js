webpackJsonp([2],{1043:function(e,n,t){var o=t(0),a=t(57),r=t(16).PageRenderer;r.__esModule&&(r=r.default);var i=a({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:t(1063)}},componentWillMount:function(){},render:function(){return o.createElement(r,Object.assign({},this.props,{content:this.state.content}))}});i.__catalog_loader__=!0,e.exports=i},1063:function(e,n){e.exports="### Seat Tooltip\n\nSeat Tooltip Component\n\n### Props\n\n```table\nspan: 6\nrows:\n  - Prop: children\n    Type: node\n    Default:\n    Notes: Render as the Seat Tooltip's children\n  - Prop: isVisible\n    Type: boolean\n    Default: false\n    Notes: Show/hide tooltip\n  - Prop: variant\n    Type: one of 'dark', 'light'\n    Default: 'light'\n    Notes: Changes tooltip color scheme\n  - Prop: size\n    Type: one of 'small', 'large'\n    Default: 'large'\n    Notes: Changes tooltip width\n  - Prop: section\n    Type: string or number\n    Default: n/a\n    Notes: Required field. Shows the section in seat data\n  - Prop: row\n    Type: string or number\n    Default: n/a\n    Notes: Required field. Shows the row in seat data\n  - Prop: seat\n    Type: string or number\n    Default: n/a\n    Notes: Required field. Shows the seat in seat data\n  - Prop: position\n    Type: Object\n    Default: all props are 0\n    Notes: This prop is generated from Tooltip.getDimensionsFromEvent(e) static function. The function should recieve the event that triggers the Tooltip (usually hover).\n```\n\n```react\n---\n<div>\n  <SeatTooltipDemo />\n  <SeatTooltipDemo size=\"small\" variant=\"dark\" />\n</div>\n```\n"}});
//# sourceMappingURL=2.57391924.chunk.js.map