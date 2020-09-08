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

const DIR_NAME = 'layout-layout';

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
    }

    if (item.icon && 0) {
      const _item = item,
            icon = _item.icon;
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase())); // if (allIcons[icon]) {
      //   icons.push(icon);
      // }
      // if (allIcons[`${v4IconName}Outlined`]) {
      //   icons.push(`${v4IconName}Outlined`);
      // }
    }

    const items = item.routes || item.children;

    if (items) {
      icons = icons.concat(formatter(items));
    }
  });
  return Array.from(new Set(icons));
}

var _default = api => {
  api.describe({
    key: 'layout',
    config: {
      schema(joi) {
        return joi.object();
      },

      onChange: api.ConfigChangeType.regenerateTmpFiles
    },
    enableBy: api.EnableBy.config
  }); // api.addDepInfo(() => {
  //   const pkg = require('../package.json');
  //   return [
  //     {
  //       name: '@ant-design/pro-layout',
  //       range:
  //         api.pkg.dependencies?.['@ant-design/pro-layout'] ||
  //         api.pkg.devDependencies?.['@ant-design/pro-layout'] ||
  //         pkg.peerDependencies['@ant-design/pro-layout'],
  //     },
  //     {
  //       name: '@umijs/route-utils',
  //       range: pkg.dependencies['@umijs/route-utils'],
  //     },
  //     {
  //       name: '@ant-design/icons',
  //       range: pkg.peerDependencies['@ant-design/icons'],
  //     },
  //   ];
  // });

  let generatedOnce = false;
  api.onGenerateFiles(() => {
    if (generatedOnce) return;
    generatedOnce = true;
    const cwd = (0, _path().join)(__dirname, '../src');

    const files = _umi().utils.glob.sync('**/*', {
      cwd
    });

    const base = (0, _path().join)(api.paths.absTmpPath, 'plugin-layout', 'layout');

    _umi().utils.mkdirp.sync(base);

    files.forEach(file => {
      if (['index.ts', 'runtime.tsx.tpl'].includes(file)) return;
      const source = (0, _path().join)(cwd, file);
      const target = (0, _path().join)(base, file);

      if ((0, _fs().statSync)(source).isDirectory()) {
        _umi().utils.mkdirp.sync(target);
      } else {
        (0, _fs().copyFileSync)(source, target);
      }
    });
  });
  api.modifyDefaultConfig(config => {
    // @ts-ignore
    config.title = false;
    return config;
  });
  let layoutOpts = {};
  api.addRuntimePluginKey(() => ['layout']);
  api.onGenerateFiles(() => {
    // apply default options
    const name = api.pkg.name;
    layoutOpts = _objectSpread({
      name,
      theme: 'PRO',
      locale: false,
      showBreadcrumb: true
    }, api.config.layout || {}); // allow custom theme

    let layoutComponent = {
      // 如果 ProLayout 没有安装会提供一个报错和一个空的 layout 组件
      PRO: './layout/layout/index.tsx'
    };

    if (layoutOpts.layoutComponent) {
      layoutComponent = Object.assign(layoutOpts.layoutComponent, layoutComponent);
    } // const theme = (layoutOpts.theme && layoutOpts.theme.toUpperCase()) || 'PRO';


    const currentLayoutComponentPath = layoutComponent['PRO'];
    api.writeTmpFile({
      path: (0, _path().join)(DIR_NAME, 'Layout.tsx'),
      content: (0, _getLayoutContent.default)(layoutOpts, currentLayoutComponentPath)
    }); // 生效临时的 icon 文件

    const userConfig = api.userConfig;
    const icons = formatter(userConfig.routes);
    let iconsString = icons.map(iconName => `import ${iconName} from '@ant-design/icons/es/icons/${iconName}'`);
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
  api.addRuntimePlugin(() => ['@@/plugin-layout/runtime.tsx']);
};

exports.default = _default;