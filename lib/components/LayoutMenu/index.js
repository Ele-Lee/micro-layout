"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayoutMenu;

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/layout/style");

var _layout = _interopRequireDefault(require("antd/es/layout"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-sizing: border-box;\n  /* margin: 8px auto; */\n  background: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  img {\n    margin: 4px;\n    height: 32px;\n    width: 32px;\n    border-radius: 50%;\n  }\n  span {\n    white-space: nowrap;\n    animation: fadeInRight 0.4s;\n    @keyframes fadeInRight {\n      from {\n        opacity: 0;\n        transform: translate3d(100%, 0, 0);\n      }\n\n      to {\n        opacity: 1;\n        transform: translate3d(0, 0, 0);\n      }\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  text-align: center;\n  padding: 0 !important;\n  margin: 8px 0 !important;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Sider = _layout.default.Sider;
var SubMenu = _menu.default.SubMenu;
var localKey = '__menu_collapsed__'; // const LayoutMenu: React.FC<LayoutMenuProps> = ({

function LayoutMenu(_ref) {
  var menuItemList = _ref.menuItemList,
      logo = _ref.logo,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 160 : _ref$width,
      selectedKey = _ref.selectedKey,
      onMenuClick = _ref.onMenuClick,
      HeaderHeight = _ref.HeaderHeight,
      activeSubMenu = _ref.activeSubMenu;

  var _useState = (0, _react.useState)(function () {
    return window.localStorage.getItem(localKey) == '1';
  }),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  (0, _react.useEffect)(function () {
    window.localStorage.setItem(localKey, collapsed ? '1' : '0');
  }, [collapsed]);

  var onCollapse = function onCollapse() {
    return setCollapsed(!+collapsed);
  };

  return /*#__PURE__*/_react.default.createElement(Sider, _extends({
    width: width,
    collapsed: collapsed,
    onCollapse: onCollapse
  }, {
    collapsible: true
  }), logo && /*#__PURE__*/_react.default.createElement(LogoWrap, {
    style: {
      height: HeaderHeight
    }
  }, /*#__PURE__*/_react.default.createElement(Logo, null, /*#__PURE__*/_react.default.createElement("img", {
    src: logo,
    alt: ""
  }), !collapsed && /*#__PURE__*/_react.default.createElement("span", null, title))), /*#__PURE__*/_react.default.createElement(_menu.default, {
    mode: "inline",
    theme: "dark" // inlineCollapsed={collapsed}
    ,
    selectedKeys: [selectedKey],
    onClick: onMenuClick,
    defaultOpenKeys: activeSubMenu ? [activeSubMenu] : undefined
  }, menuItemList(LayoutMenuItem, SubMenu)));
}

var css_flexCenter = (0, _styledComponents.css)(_templateObject()); // const ResetSider = styled(Sider)``;
// const ResetMenu = styled(Menu)``;

var LayoutMenuItem = (0, _styledComponents.default)(_menu.default.Item)(_templateObject2());

var LogoWrap = _styledComponents.default.section(_templateObject3(), css_flexCenter);

var Logo = _styledComponents.default.section(_templateObject4(), css_flexCenter); // export default LayoutMenu;