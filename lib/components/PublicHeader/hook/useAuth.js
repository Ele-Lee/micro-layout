"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuth = useAuth;

function _react() {
  const data = _interopRequireWildcard(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const apiUrl = '/portalapi/api/1/auth/portal_profile_info?app=portal';

function fetchPortalAuth() {
  return _fetchPortalAuth.apply(this, arguments);
}

function _fetchPortalAuth() {
  _fetchPortalAuth = _asyncToGenerator(function* () {
    try {
      const response = yield fetch(apiUrl);

      const _yield$response$json = yield response.json(),
            user = _yield$response$json.data.user,
            code = _yield$response$json.code;

      if (code !== 0) {
        throw 'code is not 0';
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  return _fetchPortalAuth.apply(this, arguments);
}

const devHost = () => location.host.includes('localhost') ? 'http://portalhome.uae.shensz.local' : 'https://portal.guorou.net/';

const defaultRedirectTime = 2;
const sto = {
  set: (times = defaultRedirectTime, key = 'redirectTime') => sessionStorage.setItem(key, times.toString()),
  get: (key = 'redirectTime') => Number(sessionStorage.getItem(key))
};

function useAuth() {
  const _useState = (0, _react().useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        user = _useState2[0],
        setUser = _useState2[1];

  (0, _react().useEffect)(() => {
    sto.set();
    fetchPortalAuth().then(res => {
      let remainingTime = sto.get();
      if (remainingTime <= 0) return;

      if (!res) {
        const loginUrl = `${devHost()}/login?from=${encodeURIComponent(window.location.href)}`; // window.location.replace(loginUrl);

        sto.set(remainingTime--);
        console.log('%celelee test:', 'background:#000;color:#fff', remainingTime, loginUrl);
        return;
      }

      setUser(res);
    });
  }, []);
  return {
    user
  };
}