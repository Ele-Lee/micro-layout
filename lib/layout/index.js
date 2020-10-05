"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/layout/style");

var _layout = _interopRequireDefault(require("antd/es/layout"));

var _react = _interopRequireWildcard(require("react"));

var _umi = require("umi");

var _LayoutMenu = _interopRequireDefault(require("../components/LayoutMenu"));

var _LayoutContent = _interopRequireDefault(require("../components/LayoutContent"));

var _iconFormatter = _interopRequireDefault(require("../utils/iconFormatter"));

var _microInit = require("../utils/microInit");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Content = _layout.default.Content;
var HeaderHeight = 60;

// const Header = styled.header`
//   background-color: #fff;
// `;
function BaseLayout(_ref) {
  var children = _ref.children,
      location = _ref.location,
      routes = _ref.routes,
      _ref$apps = _ref.apps,
      apps = _ref$apps === void 0 ? [] : _ref$apps,
      _ref$menuLogo = _ref.menuLogo,
      menuLogo = _ref$menuLogo === void 0 ? 'https://static.guorou.net/guorou-portal-logo.png' : _ref$menuLogo,
      _ref$menuTitle = _ref.menuTitle,
      menuTitle = _ref$menuTitle === void 0 ? '果肉运营后台基座' : _ref$menuTitle,
      userConfig = _ref.userConfig;
  var menuConfig = userConfig.menuConfig,
      subname = userConfig.subname;
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
    if (!isMainApp) return menuConfig;
    return routes; // const mergeIdxs: any[] = [];
    // const _menuRoutes = apps.map((item) => {
    //   const routesInfoFromSubIdx = routes.findIndex(
    //     (item2) => item2.title === item.title,
    //   );
    //   let routesInfoFromSub = undefined;
    //   if (routesInfoFromSubIdx > -1) {
    //     mergeIdxs.push(routesInfoFromSubIdx);
    //     routesInfoFromSub = routes[routesInfoFromSubIdx];
    //   }
    //   return { ...item, ...routesInfoFromSub };
    // });
    // return [
    //   ...routes.filter((_, idx) => !mergeIdxs.includes(idx)),
    //   ..._menuRoutes,
    // ];
  }, [routes]);
  (0, _react.useEffect)(function () {
    setActiveSubMenu(findActiveSubMenu(curPathname, menuRoutes));
  }, [curPathname, menuRoutes]);
  (0, _react.useEffect)(function () {
    if (isInMain) {
      (0, _microInit.routesDelivery)(subname, menuConfig);
    }
  }, []);
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

  if (isInMain) {
    return children;
  }

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
            icon: typeof icon === 'string' ? _react.default.createElement((0, _iconFormatter.default)(icon)) : undefined,
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
    style: {
      height: HeaderHeight
    }
  }, "\u5934"), /*#__PURE__*/_react.default.createElement(Content, {
    className: "site-layout-background",
    style: {
      margin: 16,
      height: '100%',
      backgroundColor: '#fff'
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
  var activeSubMenu = undefined; // const pathnameRegRes = $pathname.match(/(\/[\w-]+)$/);
  // if (!pathnameRegRes) {
  //   console.error('解析路由地址出错: ' + $pathname);
  //   location.href = '/';
  //   return;
  // }

  var _iterator = _createForOfIteratorHelper($routesConfig),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var iterator = _step.value;
      var children = iterator.children,
          name = iterator.name,
          path = iterator.path,
          title = iterator.title;
      activeSubMenu = name ? '/' + name : path;

      if (Array.isArray(children) && children.some(function (item) {
        return item.path === activeSubMenu;
      })) {
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
  var microLayout = _ref4.microLayout;

  if (microLayout) {
    return {
      routes: microLayout.routes,
      apps: microLayout.apps
    };
  }

  return {};
})(BaseLayout);

exports.default = _default;