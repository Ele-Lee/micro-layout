"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatter;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function allIcons() {
  const data = _interopRequireWildcard(require("@ant-design/icons"));

  allIcons = function allIcons() {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param iconName icon的名字，目前只支持Outlined类别和antd3的名字
 */
function formatter(iconName) {
  let trueIconName = '';

  if (/Outlined/.test(iconName)) {
    trueIconName = iconName;
  } else {
    trueIconName = toHump(iconName);
  } // @ts-ignore


  return allIcons()[trueIconName];
}

function toHump(name) {
  const _name = name.replace(name[0], name[0].toUpperCase());

  return _name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}