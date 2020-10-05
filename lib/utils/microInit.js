"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesDelivery = routesDelivery;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _microStore() {
  const data = _interopRequireDefault(require("@grfe/micro-store"));

  _microStore = function _microStore() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routesDelivery(appname, routesConfig) {
  if (!!appname) {
    const ss = new (_microStore().default)({
      state: {},
      name: appname
    });
    ss.set('MAIN_APP/routes/' + appname, routesConfig);
  }
}