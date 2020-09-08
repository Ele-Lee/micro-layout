"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(userConfig, path) {
  return "import React from 'react';\n\nexport default (props) => {\n  const runtimeConfig = require('umi/_runtimePlugin').mergeConfig('layout') || {};\n  const userConfig = {\n    ...".concat(JSON.stringify(userConfig).replace(/"/g, "'"), ",\n    ...runtimeConfig\n  };\n  return React.createElement(require('").concat(path, "').default, {\n    userConfig,\n    ...props\n  })\n}\n");
};

exports.default = _default;