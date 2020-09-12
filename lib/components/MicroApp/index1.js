"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MicroApp;

var _masterOptions = require("@@/plugin-qiankun/masterOptions");

var _qiankun = require("qiankun");

var _react = _interopRequireWildcard(require("react"));

var _concat = _interopRequireDefault(require("lodash/concat"));

var _mergeWith = _interopRequireDefault(require("lodash/mergeWith"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function unmountMicroApp(microApp) {
  if (microApp) {
    microApp.mountPromise.then(function () {
      return microApp.unmount();
    });
  }
}

function MicroApp(componentProps) {
  var _ref = (0, _masterOptions.getMasterOptions)(),
      masterHistoryType = _ref.masterHistoryType,
      _ref$apps = _ref.apps,
      apps = _ref$apps === void 0 ? [] : _ref$apps,
      globalLifeCycles = _ref.lifeCycles,
      globalSettings = _objectWithoutProperties(_ref, ["masterHistoryType", "apps", "lifeCycles"]);

  var name = componentProps.name,
      _componentProps$setti = componentProps.settings,
      settingsFromProps = _componentProps$setti === void 0 ? {} : _componentProps$setti,
      loadingRenderCb = componentProps.loadingRenderCb,
      _componentProps$lifeC = componentProps.lifeCycles,
      lifeCycles = _componentProps$lifeC === void 0 ? {} : _componentProps$lifeC,
      propsFromParams = _objectWithoutProperties(componentProps, ["name", "settings", "loadingRenderCb", "lifeCycles"]);

  var appConfig = apps.find(function (app) {
    return app.name === name;
  });

  if (!appConfig) {
    throw new Error("[@umijs/plugin-qiankun]: Can not find the configuration of ".concat(name, " app!"));
  }

  var entry = appConfig.entry,
      _appConfig$props = appConfig.props,
      propsFromConfig = _appConfig$props === void 0 ? {} : _appConfig$props;
  var containerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  (0, _react.useEffect)(function () {
    microAppRef.current = (0, _qiankun.loadMicroApp)({
      name: name,
      entry: entry,
      container: containerRef.current,
      props: _objectSpread(_objectSpread({}, propsFromConfig), propsFromParams)
    }, _objectSpread(_objectSpread({}, globalSettings), settingsFromProps), (0, _mergeWith.default)({}, globalLifeCycles, _objectSpread(_objectSpread({}, lifeCycles), {}, {
      afterMount: function afterMount() {
        setLoading(false);

        if ((0, _isFunction.default)(lifeCycles.afterMount)) {
          lifeCycles.afterMount();
        }
      }
    }), function (v1, v2) {
      return (0, _concat.default)(v1 !== null && v1 !== void 0 ? v1 : [], v2 !== null && v2 !== void 0 ? v2 : []);
    }));
    return function () {
      setLoading(true);
      unmountMicroApp(microAppRef.current);
    };
  }, [name]);
  var microAppRef = (0, _react.useRef)();
  var updatingPromise = (0, _react.useRef)();
  var updatingTimestamp = (0, _react.useRef)(Date.now());
  (0, _react.useEffect)(function () {
    var microApp = microAppRef.current;

    if (microApp) {
      if (!updatingPromise.current) {
        // 初始化 updatingPromise 为 microApp.mountPromise，从而确保后续更新是在应用 mount 完成之后
        updatingPromise.current = microApp.mountPromise;
      } else {
        // 确保 microApp.update 调用是跟组件状态变更顺序一致的，且后一个微应用更新必须等待前一个更新完成
        updatingPromise.current = updatingPromise.current.then(function () {
          var canUpdate = function canUpdate(microApp) {
            return (microApp === null || microApp === void 0 ? void 0 : microApp.update) && microApp.getStatus() === 'MOUNTED';
          };

          if (canUpdate(microApp)) {
            var props = _objectSpread(_objectSpread({}, propsFromConfig), propsFromParams);

            if (process.env.NODE_ENV === 'development') {
              if (Date.now() - updatingTimestamp.current < 200) {
                console.warn("[@umijs/plugin-qiankun] It seems like microApp ".concat(name, " is updating too many times in a short time(200ms), you may need to do some optimization to avoid the unnecessary re-rendering."));
              }

              console.info("[@umijs/plugin-qiankun] MicroApp ".concat(name, " is updating with props: "), props);
              updatingTimestamp.current = Date.now();
            } // 返回 microApp.update 形成链式调用
            // @ts-ignore


            return microApp.update(props);
          }

          return void 0;
        });
      }
    }

    return function () {};
  }, Object.values(_objectSpread({}, propsFromParams)));
  return !!loadingRenderCb ? /*#__PURE__*/_react.default.createElement("div", null, loadingRenderCb( /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef
  }), loading)) : /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef
  });
}