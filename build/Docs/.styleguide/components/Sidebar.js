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

const useStyles = (0, _uiCore.makeStyles)({
  input: {// backgroundColor: "transparent",
    // borderColor: 'rgba(243, 247, 255, 0.23)'
  }
}); // Built from Styleguidist 'TableOfContentsRenderer' component

const Sidebar = props => {
  const children = props.children,
        onSearchTermChange = props.onSearchTermChange;

  const _useTheme = (0, _uiCore.useTheme)(),
        palette = _useTheme.palette;

  const classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
    m: 3
  }, /*#__PURE__*/_react.default.createElement(_uiCore.Input, {
    className: classes.input,
    fullWidth: true,
    placeholder: "Filter",
    onChange: event => onSearchTermChange(event.target.value),
    startAdornment: /*#__PURE__*/_react.default.createElement(_uiCore.InputAdornment, {
      position: "start"
    }, /*#__PURE__*/_react.default.createElement(_icons.Search, {
      size: 12,
      color: palette.text.secondary
    }))
  })), children);
};

Sidebar.propTypes = {
  children: _propTypes.default.node,
  searchTerm: _propTypes.default.string.isRequired,
  onSearchTermChange: _propTypes.default.func.isRequired
};
var _default = Sidebar;
exports.default = _default;