"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiCore = require("@ayx/ui-core");

var _MainAppBar = _interopRequireDefault(require("./MainAppBar"));

var _MarkdownStyleOverrider = _interopRequireDefault(require("./MarkdownStyleOverrider"));

const useStyles = (0, _uiCore.makeStyles)(({
  palette,
  spacing,
  direction
}) => ({
  root: {
    minHeight: '100vh',
    paddingLeft: direction === "ltr" ? 200 : 'unset',
    paddingRight: direction === "ltr" ? 'unset' : 200,
    backgroundColor: (0, _uiCore.lighten)(palette.background.default, 0.04)
  },
  content: {
    maxWidth: 1000,
    padding: spacing(16, 8, 2, 10),
    margin: '0 auto',
    display: 'block'
  },
  version: {
    textAlign: direction === "rtl" ? "left" : "right",
    fontSize: 11,
    margin: spacing(-8, 10, 6)
  },
  sidebar: {
    // color: palette.type === "dark" ? undefined : palette.background.paper, // Needed to avoid the collisions of body1 typography colors
    // backgroundColor: palette.type === "dark" ? "#222" : "#142254",
    borderRight: "1px solid ".concat(palette.divider),
    position: "fixed",
    width: 220,
    left: direction === "ltr" ? 0 : 'unset',
    right: direction === "ltr" ? 'unset' : 0,
    height: "100vh",
    overflow: "auto"
  }
})); // Built from Styleguidist 'StyleGuideRenderer' component

const StyleGuideRenderer = ({
  version,
  children,
  toc,
  toggleDirection,
  togglePaletteType,
  handleProductNameChange,
  productThemeName
}) => {
  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    container: true,
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    item: true,
    className: classes.sidebar,
    component: "nav"
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
    p: 4
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Typography, {
    variant: "h1"
  }, "UI-SDK")), /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
    marginLeft: 6,
    className: classes.version
  }, "VERSION 0.0.1"), /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
    marginBottom: 6
  }, toc)), /*#__PURE__*/_react.default.createElement(_MainAppBar.default, {
    productThemeName: productThemeName,
    toggleDirection: toggleDirection,
    togglePaletteType: togglePaletteType,
    handleProductNameChange: handleProductNameChange
  }), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    container: true,
    className: classes.content,
    spacing: 4
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    item: true,
    xs: 12,
    component: "main"
  }, /*#__PURE__*/_react.default.createElement(_MarkdownStyleOverrider.default, null, children)))));
};

StyleGuideRenderer.propTypes = {
  title: _propTypes.default.string.isRequired,
  version: _propTypes.default.string,
  homepageUrl: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,
  toc: _propTypes.default.node.isRequired,
  handleProductNameChange: _propTypes.default.func.isRequired
};
var _default = StyleGuideRenderer;
exports.default = _default;