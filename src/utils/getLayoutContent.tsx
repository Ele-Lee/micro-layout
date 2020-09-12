// import { LayoutConfig } from '../types/interface.d';
interface LayoutConfig {
  name?: string;
  logo?: string;
  theme?: string;
  locale?: any; // same with locale plugin
  showBreadcrumb?: boolean; // TODO 面包屑功能暂不支持
  layoutComponent?: Record<string, string>; // 自定义主题
}
export default (
  userConfig: LayoutConfig,
  path: string,
) => `import React, { useState, useEffect } from "react";
import { ApplyPluginsType, useModel } from "umi";
import { plugin } from "../core/umiExports";

export default props => {
  const [runtimeConfig, setRuntimeConfig] = useState(null);

  const initialInfo = (useModel && useModel("@@initialState")) || {
    initialState: undefined,
    loading: false,
    setInitialState: null
  }; // plugin-initial-state 未开启

  useEffect(() => {
    const useRuntimeConfig =
      plugin.applyPlugins({
        key: "mlayout",
        type: ApplyPluginsType.modify,
        initialValue: initialInfo
      }) || {};
    if (useRuntimeConfig instanceof Promise) {
      useRuntimeConfig.then(config => {
        setRuntimeConfig(config);
      });
      return;
    }
    setRuntimeConfig(useRuntimeConfig);
  }, [initialInfo?.initialState]);

  const userConfig = {
    ...${JSON.stringify(userConfig).replace(/"/g, "'")},
    ...runtimeConfig || {}
  };

  if(!runtimeConfig){
    return null
  }

  return React.createElement(require("${path}").default, {
    userConfig,
    ...props
  });
};
`;
