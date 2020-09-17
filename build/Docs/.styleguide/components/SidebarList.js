"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiCore = require("@ayx/ui-core");

var _icons = require("@ayx/icons");

var _handleHash = require("react-styleguidist/lib/client/utils/handleHash");

const iconLookup = {
  'getting started': _icons.Home,
  'guides': _icons.BookOpen,
  'releases': _icons.GitMerge,
  'icons': _icons.GridView,
  'colors': _icons.Aperture,
  'layout': _icons.Layout,
  'core components': _icons.Box,
  'common': _icons.Box,
  'lab': _icons.Box,
  'utils': _icons.Settings
};
const useStyles = (0, _uiCore.makeStyles)(({
  palette,
  spacing
}) => ({
  listItemSubHeader: {
    paddingLeft: spacing(7)
  },
  listItemIcon: {
    minWidth: spacing(7)
  },
  list: {
    color: palette.type === 'dark' ? palette.primary.contrastText : 'inherit'
  }
})); // Built from Styleguidist 'ComponentsListRenderer' component
// We build our own list renderer to add support for collapsable sections
// Ref: https://react-styleguidist.js.org/docs/cookbook.html#how-to-change-the-layout-of-a-style-guide

const SidebarList = ({
  items
}) => {
  const classes = useStyles();

  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        forceClose = _useState2[0],
        setForceClose = _useState2[1];

  items = items.filter(item => item.visibleName);

  if (!items.length) {
    return null;
  }

  const windowHash = window.location.pathname + (0, _handleHash.getHash)(window.location.hash);
  return /*#__PURE__*/_react.default.createElement(_uiCore.List, {
    className: classes.list,
    disablePadding: true
  }, items.map(({
    heading,
    visibleName,
    href,
    content,
    external
  }, index) => {
    const firstReplace = href.replace('/#', '');
    const itemToCompare = firstReplace.replace('%20', ' ');
    const isItemSelected = windowHash === itemToCompare;
    const isActivePath = windowHash.indexOf(itemToCompare) > -1;
    const isItemOpen = isActivePath && !forceClose;

    const Icon = iconLookup[visibleName && visibleName.replace('%20', ' ').toLowerCase()] || _icons.Layers;

    if (visibleName && visibleName.toLowerCase() === "divide") {
      return /*#__PURE__*/_react.default.createElement(_uiCore.Box, {
        my: 2,
        key: "itemToCompare".concat(index)
      }, /*#__PURE__*/_react.default.createElement(_uiCore.Divider, null));
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: itemToCompare
    }, /*#__PURE__*/_react.default.createElement(_uiCore.ListItem, {
      button: true,
      selected: isItemSelected,
      "data-test": visibleName,
      component: "a",
      href: href,
      target: external ? '_blank' : undefined,
      onClick: () => {
        setForceClose(isItemSelected ? !forceClose : false);
      }
    }, heading ? /*#__PURE__*/_react.default.createElement(_uiCore.ListItemIcon, {
      className: classes.listItemIcon
    }, /*#__PURE__*/_react.default.createElement(Icon, {
      size: 14
    })) : null, /*#__PURE__*/_react.default.createElement(_uiCore.ListItemText, {
      className: !content || !content.props.items.length ? classes.listItemSubHeader : undefined,
      primary: heading ? /*#__PURE__*/_react.default.createElement("b", null, visibleName) : visibleName
    })), /*#__PURE__*/_react.default.createElement(_uiCore.Collapse, {
      in: isItemOpen
    }, content));
  }));
};

SidebarList.propTypes = {
  items: _propTypes.default.array.isRequired
};
var _default = SidebarList;
exports.default = _default;