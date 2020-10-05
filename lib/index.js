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

function _umi() {
  const data = require("umi");

  _umi = function _umi() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

var _getLayoutContent = _interopRequireDefault(require("./utils/getLayoutContent"));

function _fs() {
  const data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DIR_NAME = 'elelee-layout';
const CONFIG_KEY = 'mlayout';

// function haveProLayout() {
//   try {
//     require.resolve('@ant-design/pro-layout');
//     return true;
//   } catch (error) {
//     console.log(error);
//     console.error('@umijs/plugin-layout 需要安装 ProLayout 才可运行');
//   }
//   return false;
// }
function toHump(name) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

function formatter(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  let icons = [];
  (data || []).forEach((item = {
    path: '/'
  }) => {
    // 兼容旧的写法 menu:{icon:""}
    if (item.menu) {
      item = _objectSpread(_objectSpread({}, item), item.menu);
    } // if (item.icon) {
    //   const { icon } = item;
    //   const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
    //   if (allIcons[icon]) {
    //     icons.push(icon);
    //   }
    //   if (allIcons[`${v4IconName}Outlined`]) {
    //     icons.push(`${v4IconName}Outlined`);
    //   }
    // }


    const items = item.routes || item.children;

    if (items) {
      icons = icons.concat(formatter(items));
    }
  });
  return Array.from(new Set(icons));
}

var _default = api => {
  api.describe({
    key: 'mlayout',
    config: {
      schema(joi) {
        return joi.object();
      },

      onChange: api.ConfigChangeType.regenerateTmpFiles
    },
    enableBy: api.EnableBy.config
  });
  api.modifyDefaultConfig(config => {
    // @ts-ignore
    config.title = false;
    return config;
  });
  let layoutOpts = {};
  api.addRuntimePluginKey(() => [CONFIG_KEY]);
  api.onGenerateFiles(() => {
    // apply default options
    const name = api.pkg.name;
    layoutOpts = _objectSpread({
      name,
      theme: 'PRO',
      locale: false,
      showBreadcrumb: true
    }, api.config[CONFIG_KEY] || {}); // allow custom theme

    let layoutComponent = {
      // 如果 ProLayout 没有安装会提供一个报错和一个空的 layout 组件
      PRO: _umi().utils.winPath((0, _path().join)(__dirname, './layout/index.js'))
    };

    if (layoutOpts.layoutComponent) {
      layoutComponent = Object.assign(layoutOpts.layoutComponent, layoutComponent);
    } // const theme = (layoutOpts.theme && layoutOpts.theme.toUpperCase()) || 'PRO';


    const currentLayoutComponentPath = layoutComponent['PRO'];
    api.writeTmpFile({
      path: (0, _path().join)(DIR_NAME, 'Layout.tsx'),
      content: (0, _getLayoutContent.default)(layoutOpts, currentLayoutComponentPath)
    }); // 生效临时的 icon 文件

    const userConfig = api.userConfig; // TODO 这里需要补充

    const icons = formatter(userConfig.menusConfig);
    let iconsString = icons.map(iconName => `import ${iconName} from '@ant-design/icons/${iconName}'`);
    api.writeTmpFile({
      path: (0, _path().join)(DIR_NAME, 'icons.ts'),
      content: `
  ${iconsString.join(';\n')}
  export default {
    ${icons.join(',\n')}
  }
      `
    });
    api.writeTmpFile({
      path: (0, _path().join)(DIR_NAME, 'runtime.tsx'),
      content: (0, _fs().readFileSync)((0, _path().join)(__dirname, 'runtime.tsx.tpl'), 'utf-8')
    });
  });
  api.modifyRoutes(routes => {
    return [{
      path: '/',
      component: _umi().utils.winPath((0, _path().join)(api.paths.absTmpPath || '', DIR_NAME, 'Layout.tsx')),
      routes
    }];
  });
  api.addRuntimePlugin(() => ['@@/' + DIR_NAME + '/runtime.tsx']);
};

exports.default = _default;