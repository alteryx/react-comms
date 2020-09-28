"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiCore = require("@ayx/ui-core");

var _icons = require("@ayx/icons");

const useStyles = (0, _uiCore.makeStyles)(({
  palette,
  direction
}) => ({
  appBar: {
    width: "calc(100% - 220px)",
    right: direction === "ltr" ? 0 : 'unset',
    left: direction === "ltr" ? 'unset' : 0
  }
}));

const MainAppBar = ({
  productThemeName,
  handleProductNameChange,
  toggleDirection,
  togglePaletteType
}) => {
  // Direction Alert
  const handleToggleDirectionClick = () => {
    toggleDirection();
  };

  const _useTheme = (0, _uiCore.useTheme)(),
        palette = _useTheme.palette,
        direction = _useTheme.direction;

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_uiCore.AppBar, {
    elevation: 0,
    color: "inherit",
    position: "fixed",
    className: classes.appBar
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Toolbar, {
    variant: "dense",
    disableGutters: true
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    container: true,
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    item: true,
    xs: true
  }), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
    item: true,
    className: classes.headerIcons
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Tooltip, {
    arrow: true,
    title: "Toggle Direction"
  }, /*#__PURE__*/_react.default.createElement(_uiCore.IconButton, {
    onClick: handleToggleDirectionClick
  }, direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_icons.ArrowRightCircle, null) : /*#__PURE__*/_react.default.createElement(_icons.ArrowLeftCircle, null))), /*#__PURE__*/_react.default.createElement(_uiCore.Tooltip, {
    arrow: true,
    title: "Toggle Dark Mode"
  }, /*#__PURE__*/_react.default.createElement(_uiCore.IconButton, {
    onClick: togglePaletteType
  }, palette.type === "dark" ? /*#__PURE__*/_react.default.createElement(_icons.Sunrise, null) : /*#__PURE__*/_react.default.createElement(_icons.Sunset, null))), /*#__PURE__*/_react.default.createElement(_uiCore.Tooltip, {
    arrow: true,
    title: "GitLab"
  }, /*#__PURE__*/_react.default.createElement(_uiCore.IconButton, {
    onClick: () => {
      window.open("https://git.alteryx.com/ayx-ui-sdk/ui-sdk");
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.Gitlab, null)))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, null, /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
    m: 3
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Select, {
    messages: {
      noOptions: "No Results",
      placeholder: "Product Theme"
    },
    options: [{
      value: "default",
      primary: "Default Product Theme"
    }, {
      value: "aep",
      primary: "Server.Next"
    }, {
      value: "d1",
      primary: "Designer"
    }, {
      value: "dx",
      primary: "Designer.Next"
    }],
    disableClearable: true,
    value: productThemeName,
    onChange: e => handleProductNameChange(e.target.value)
  }))))), /*#__PURE__*/_react.default.createElement(_uiCore.Divider, null)));
};

MainAppBar.propTypes = {
  handleProductNameChange: _propTypes.default.func.isRequired
};
var _default = MainAppBar;
exports.default = _default;