"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/layout/style");

var _layout = _interopRequireDefault(require("antd/es/layout"));

var _react = _interopRequireWildcard(require("react"));

var _LayoutMenu = _interopRequireDefault(require("../components/LayoutMenu"));

var _LayoutContent = _interopRequireDefault(require("../components/LayoutContent"));

var _umi = require("umi");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Content = _layout.default.Content;
var HeaderHeight = 60;

function BaseLayout(_ref) {
  var children = _ref.children,
      location = _ref.location,
      route = _ref.route,
      history = _ref.history,
      match = _ref.match,
      routes = _ref.routes,
      _ref$apps = _ref.apps,
      apps = _ref$apps === void 0 ? [] : _ref$apps,
      _ref$menuLogo = _ref.menuLogo,
      menuLogo = _ref$menuLogo === void 0 ? 'https://static.guorou.net/guorou-portal-logo.png' : _ref$menuLogo,
      _ref$menuTitle = _ref.menuTitle,
      menuTitle = _ref$menuTitle === void 0 ? '果肉运营后台' : _ref$menuTitle;
  var curPathname = location.pathname;

  var _useState = (0, _react.useState)(curPathname),
      _useState2 = _slicedToArray(_useState, 2),
      menuItemKey = _useState2[0],
      setMenuItemKey = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      activeSubMenu = _useState4[0],
      setActiveSubMenu = _useState4[1];

  if (!menuItemKey) {
    throw Error('路由没有name 或者 path');
  }

  var isInMain = window !== undefined && !!window.__POWERED_BY_QIANKUN__;
  var isMainApp = window.__isMainApp__;
  var menuRoutes = (0, _react.useMemo)(function () {
    if (!isMainApp) return routesConfig;
    var mergeIdxs = [];

    var _menuRoutes = apps.map(function (item) {
      var routesInfoFromSubIdx = routes.findIndex(function (item2) {
        return item2.title === item.title;
      });
      var routesInfoFromSub = undefined;

      if (routesInfoFromSubIdx > -1) {
        mergeIdxs.push(routesInfoFromSubIdx);
        routesInfoFromSub = routes[routesInfoFromSubIdx];
      }

      return _objectSpread(_objectSpread({}, item), routesInfoFromSub);
    });

    return [].concat(_toConsumableArray(routes.filter(function (_, idx) {
      return !mergeIdxs.includes(idx);
    })), _toConsumableArray(_menuRoutes));
  }, [apps, routes]);
  (0, _react.useEffect)(function () {
    setActiveSubMenu(findActiveSubMenu(curPathname, menuRoutes));
  }, [curPathname, menuRoutes]);

  if (isInMain) {
    return children;
  }

  var contentWarp = (0, _react.useMemo)(function () {
    if (!isMainApp && !isInMain) {
      return _react.default.createElement('div', {
        children: children
      });
    }

    return apps.length ? _react.default.createElement(_LayoutContent.default, {
      appName: findNameByPath(menuItemKey, apps),
      children: children
    }) : null;
  }, [apps.length, menuItemKey]);
  return /*#__PURE__*/_react.default.createElement(_layout.default, {
    style: {
      minHeight: '100vh'
    }
  }, activeSubMenu && /*#__PURE__*/_react.default.createElement(_LayoutMenu.default, {
    logo: menuLogo,
    title: menuTitle,
    selectedKey: menuItemKey,
    HeaderHeight: HeaderHeight,
    activeSubMenu: activeSubMenu,
    menuItemList: function menuItemList(LayoutMenuItem, SubMenu) {
      function renderItemByItem(routesArr) {
        var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';
        return routesArr.map(function (_ref2) {
          var name = _ref2.name,
              title = _ref2.title,
              icon = _ref2.icon,
              path = _ref2.path,
              children = _ref2.children;
          var menuProps = {
            key: pathPrefix + (name || path),
            icon: icon ? _react.default.createElement(icon) : undefined,
            title: title
          };
          menuProps.key = menuProps.key.replace(/\/{2,}/g, '/');

          if (Array.isArray(children)) {
            return /*#__PURE__*/_react.default.createElement(SubMenu, menuProps, renderItemByItem(children, menuProps.key));
          }

          return /*#__PURE__*/_react.default.createElement(LayoutMenuItem, menuProps, title, /*#__PURE__*/_react.default.createElement(_umi.Link, {
            to: menuProps.key
          }));
        });
      }

      return renderItemByItem(menuRoutes);
    },
    onMenuClick: function onMenuClick(_ref3) {
      var key = _ref3.key;

      var _key = String(key);

      setMenuItemKey(_key);
    }
  }), /*#__PURE__*/_react.default.createElement(_layout.default, {
    className: "site-layout"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "b-c_fff",
    style: {
      height: HeaderHeight
    }
  }, "\u5934"), /*#__PURE__*/_react.default.createElement(Content, {
    className: "site-layout-background b-c_fff",
    style: {
      margin: 16,
      height: '100%'
    }
  }, contentWarp)));
}

function findNameByPath($path, $apps) {
  var appNameRegRes = $path.match(/^\/([\w-]+)\b/);
  if (!appNameRegRes) console.error('解析子应用名字出错');

  if (appNameRegRes) {
    var appName = appNameRegRes[1];
    var findRes = $apps.find(function (item) {
      return item.name === appName;
    });

    if (findRes) {
      return findRes.name;
    }
  }

  return void 0;
}

function findActiveSubMenu($pathname, $routesConfig) {
  if ($pathname === '/') return $pathname;
  var activeSubMenu = undefined;
  var pathnameRegRes = $pathname.match(/(\/[\w-]+)$/);
  if (!pathnameRegRes) throw '解析路由地址出错: ' + $pathname;

  var _iterator = _createForOfIteratorHelper($routesConfig),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var iterator = _step.value;
      var children = iterator.children,
          name = iterator.name,
          path = iterator.path,
          title = iterator.title;

      if (Array.isArray(children) && children.some(function (item) {
        return item.path === pathnameRegRes[1];
      })) {
        activeSubMenu = name ? '/' + name : path;
        break;
      }

      if ($pathname === "/".concat(name) || $pathname === path) {
        activeSubMenu = $pathname;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return activeSubMenu;
}

var __connect = _umi.connect ? _umi.connect : function (props) {
  return function (BaseComp) {
    return BaseComp;
  };
};

var _default = __connect(function (_ref4) {
  var global = _ref4.global;
  return {
    routes: global.routes,
    apps: global.apps
  };
})(BaseLayout);

exports.default = _default;