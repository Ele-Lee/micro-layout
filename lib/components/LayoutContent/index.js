"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("../MicroApp/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutContent = function LayoutContent(_ref) {
  var appName = _ref.appName,
      children = _ref.children;
  var microDom = (0, _react.useMemo)(function () {
    return appName ? /*#__PURE__*/_react.default.createElement(_index.default, {
      name: appName,
      loadingRenderCb: function loadingRenderCb(d, l) {
        return /*#__PURE__*/_react.default.createElement(_spin.default, {
          spinning: l,
          style: {
            marginTop: 10
          }
        }, d) //   <div className="mlayout-reset-antd">
        // </div>
        ;
      }
    }) : children;
  }, [appName]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'relative'
    }
  }, microDom);
}; // const ResetSpin = styled(Spin)`
//   .ant-spin-dot {
//     margin-top: 10px !important;
//   }
// `;


var _default = LayoutContent;
exports.default = _default;