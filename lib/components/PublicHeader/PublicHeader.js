"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserInfo = void 0;

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/layout/style");

var _layout = _interopRequireDefault(require("antd/es/layout"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _intersection = _interopRequireDefault(require("lodash/intersection"));

var _reactRouterDom = require("react-router-dom");

var _icons = require("@ant-design/icons");

var _useAuth2 = require("./hook/useAuth");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  > .avatar {\n    margin-right: 10px;\n    vertical-align: middle;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 18px;\n  line-height: 58px !important;\n  padding: 0 16px;\n  cursor: pointer;\n  transition: color 0.3s;\n  float: left;\n  &:hover {\n    color: #108ee9;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import { globalHeaderHeight } from 'config/settings';
var Header = _layout.default.Header;
var globalHeaderHeight = 60;

var Trigger = _styledComponents.default.span(_templateObject());

var UserInfo = _styledComponents.default.div(_templateObject2());

exports.UserInfo = UserInfo;

var GlobalHeader = function GlobalHeader(_ref) {
  _objectDestructuringEmpty(_ref);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      toggleCollapsed = _useState2[1];

  var toggle = function toggle() {
    toggleCollapsed(!collapsed);
  };

  var _useAuth = (0, _useAuth2.useAuth)(),
      user = _useAuth.user;

  var headerStyle = {
    right: 0,
    background: '#fff',
    padding: 0,
    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
    zIndex: 100,
    height: globalHeaderHeight
  };

  var handleLogout = function handleLogout() {};

  var hasPermission = function hasPermission(permission) {
    return (0, _intersection.default)(user.permission, permission).length > 0;
  };

  if (!user) return null;
  return /*#__PURE__*/_react.default.createElement(Header, {
    style: headerStyle
  }, /*#__PURE__*/_react.default.createElement(Trigger, {
    type: collapsed ? 'menu-unfold' : 'menu-fold',
    onClick: toggle
  }), /*#__PURE__*/_react.default.createElement(_menu.default, {
    mode: "horizontal",
    style: {
      lineHeight: "".concat(globalHeaderHeight, "px"),
      height: "".concat(globalHeaderHeight, "px"),
      textAlign: 'right'
    },
    selectedKeys: []
  }, /*#__PURE__*/_react.default.createElement(_menu.default.Item, null), /*#__PURE__*/_react.default.createElement(_menu.default.SubMenu, {
    title: /*#__PURE__*/_react.default.createElement(UserInfo, null, user.avatar_url ? /*#__PURE__*/_react.default.createElement(_avatar.default, {
      src: user.avatar_url
    }) : /*#__PURE__*/_react.default.createElement(_avatar.default, {
      style: {
        backgroundColor: '#f56a00',
        verticalAlign: 'middle'
      }
    }, user.username.slice(0, 1)), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        marginLeft: 10
      }
    }, user.username))
  }, /*#__PURE__*/_react.default.createElement(_menu.default.Item, null, /*#__PURE__*/_react.default.createElement("a", {
    href: "/profile/base-info"
  }, /*#__PURE__*/_react.default.createElement(_icons.ProjectOutlined, null), "\u4E2A\u4EBA\u4FE1\u606F")), hasPermission(['*', 'portal/user-manage/view_user_manage_module']) && /*#__PURE__*/_react.default.createElement(_menu.default.Item, null, /*#__PURE__*/_react.default.createElement("a", {
    href: "/ram/user-manage/member",
    target: "_black"
  }, /*#__PURE__*/_react.default.createElement(_icons.TeamOutlined, null), "\u4EBA\u5458\u7BA1\u7406")), /*#__PURE__*/_react.default.createElement(_menu.default.Item, null, /*#__PURE__*/_react.default.createElement("a", {
    href: "/download-center"
  }, /*#__PURE__*/_react.default.createElement(_icons.DownloadOutlined, null), "\u4E0B\u8F7D\u4E2D\u5FC3")), /*#__PURE__*/_react.default.createElement(_menu.default.Divider, null), /*#__PURE__*/_react.default.createElement(_menu.default.Item, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: "/wxtool/portal-tag-manage"
  }, "\u6807\u7B7E\u7BA1\u7406")), /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
    key: "logout",
    onClick: handleLogout
  }, "\u9000\u51FA\u767B\u5F55"))));
};

var _default = GlobalHeader;
exports.default = _default;