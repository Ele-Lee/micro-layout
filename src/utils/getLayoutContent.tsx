import { BaseLayoutProps } from '../layouts';

export default (
  userConfig: BaseLayoutProps,
  path: string,
) => `import React from 'react';

export default (props) => {
  const runtimeConfig = require('umi/_runtimePlugin').mergeConfig('layout') || {};
  const userConfig = {
    ...${JSON.stringify(userConfig).replace(/"/g, "'")},
    ...runtimeConfig
  };
  return React.createElement(require('${path}').default, {
    userConfig,
    ...props
  })
}
`;
