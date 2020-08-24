import { IApi } from 'umi-types';
import { join } from 'path';
import getLayoutContent from './utils/getLayoutContent';
import { BaseLayoutProps } from './layouts';

const DIR_NAME = 'micro-layout';

export default (api: IApi, opts: any = {}) => {
  let layoutOpts: BaseLayoutProps = { ...opts };
  api.onOptionChange(newOption => {
    opts = newOption; // eslint-disable-line no-param-reassign
    api.rebuildTmpFiles();
  });

  api.addRuntimePluginKey('layout');

  api.onGenerateFiles(() => {
    // apply default options
    layoutOpts = {
      name: api.pkg.name || 'pro',
      theme: 'PRO',
      locale: false,
      showBreadcrumb: true,
      ...(api.config as any).layout,
      ...opts,
    };

    // allow custom theme
    let layoutComponent = {
      PRO: api.winPath(join(__dirname, './layout/index.js')),
    };
    // if (layoutOpts.layoutComponent) {
    //   layoutComponent = Object.assign(layoutOpts.layoutComponent, layoutComponent);
    // }

    // const theme =
    //   (layoutOpts.theme && layoutOpts.theme.toUpperCase()) || 'PRO';
    // const currentLayoutComponentPath = layoutComponent[theme] || layoutComponent['PRO'];
    const currentLayoutComponentPath = layoutComponent['PRO'];

    api.writeTmpFile(
      join(DIR_NAME, 'Layout.tsx'),
      getLayoutContent(layoutOpts, currentLayoutComponentPath),
    );
  });

  api.modifyRoutes(routes => [
    {
      path: '/',
      component: join(api.paths.absTmpDirPath, DIR_NAME, 'Layout.tsx'),
      routes,
    },
  ]);
};
