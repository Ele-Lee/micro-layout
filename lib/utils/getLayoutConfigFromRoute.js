"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _memoizeOne() {
  const data = _interopRequireDefault(require("memoize-one"));

  _memoizeOne = function _memoizeOne() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defalutLayoutConfig = {
  hideMenu: false,
  hideNav: false
};
/**
 * @param routes
 */

function formatter(routes = [], prefix = '', base = '/', parentRouteLayoutConfig = defalutLayoutConfig, LayoutConfig = {}) {
  routes.filter(item => {
    var _item$path;

    return item && !((_item$path = item.path) === null || _item$path === void 0 ? void 0 : _item$path.startsWith('http'));
  }).map(route => {
    const layout = route.layout,
          indexRoute = route.indexRoute,
          _route$path = route.path,
          path = _route$path === void 0 ? '' : _route$path,
          routes = route.routes,
          unaccessible = route.unaccessible; // 继承父路由的 layout 配置

    let hideNav = parentRouteLayoutConfig.hideNav;
    let hideMenu = parentRouteLayoutConfig.hideMenu; // 子路由的 layout 配置 优先级更高

    switch (layout) {
      case undefined:
        hideMenu = hideMenu;
        hideNav = hideNav;
        break;

      case true:
        hideMenu = false;
        hideNav = false;
        break;

      case false:
        hideMenu = true;
        hideNav = true;
        break;

      default:
        hideMenu = layout.hideMenu === undefined ? hideMenu : layout.hideMenu;
        hideNav = layout.hideNav === undefined ? hideNav : layout.hideNav;
    } // 拼接 path


    const absolutePath = path.startsWith('/') ? path : `${base}${base === '/' ? '' : '/'}${path}`;
    LayoutConfig[`${prefix}${absolutePath}`] = {
      hideMenu,
      hideNav,
      unAccessible: unaccessible || false
    }; // 拼接 childrenRoutes, 处理存在 indexRoute 时的逻辑

    const childrenRoutes = indexRoute ? [_objectSpread({
      path,
      layout
    }, indexRoute)].concat(routes || []) : routes; // 拼接返回的 layout 数据

    if (childrenRoutes && childrenRoutes.length) {
      const result = formatter(childrenRoutes, prefix, absolutePath, {
        hideMenu,
        hideNav
      }, LayoutConfig);
      LayoutConfig = _objectSpread(_objectSpread({}, LayoutConfig), result);
    }
  });
  return LayoutConfig;
} // 参数深比较


const getLayoutConfigFromRoute = (0, _memoizeOne().default)(formatter, _lodash().isEqual);
var _default = getLayoutConfigFromRoute;
exports.default = _default;