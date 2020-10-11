import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore
import { IRouteComponentProps, MainAppModelState, Link, connect } from 'umi';
import { Layout } from 'antd';
import _omit from 'lodash/omit';
import LayoutMenu from '../components/LayoutMenu';
import LayoutContent from '../components/LayoutContent';
import iconFormatter from '../utils/iconFormatter';
import { routesDelivery } from '../utils/microInit';
import { AppOption, MenuConfig } from '../typings/typing';
import PublicHeader from '../components/PublicHeader';

const { Content } = Layout;
const headerHeight = 60;

interface BaseLayoutProps extends IRouteComponentProps {
  menus: MenuConfig[];
  apps: AppOption[];
  menuLogo: string;
  menuTitle: string;
  userConfig: {
    menuConfig: MenuConfig[];
    subname: string;
  };
}
// const Header = styled.header`
//   background-color: #fff;
// `;

function BaseLayout({
  children,
  location,
  // route,
  // history,
  // match,
  menus,
  apps = [],
  menuLogo = 'https://static.guorou.net/guorou-portal-logo.png',
  menuTitle = '果肉运营后台基座',
  userConfig,
}: BaseLayoutProps) {
  const { menuConfig, subname } = userConfig;
  const curPathname = location.pathname;
  const [menuItemKey, setMenuItemKey] = useState(curPathname);
  const [activeSubMenu, setActiveSubMenu] = useState<string | undefined>(
    undefined,
  );

  if (!menuItemKey) {
    throw Error('路由没有name 或者 path');
  }

  const isInMain = window !== undefined && !!window.__POWERED_BY_QIANKUN__;
  const isMainApp = window.__isMainApp__;

  const [menuRoutes, setMenuRoutes] = useState<MenuConfig[]>([]);
  useEffect(() => {
    if (!isMainApp) {
      setMenuRoutes(menuConfig);
      return;
    }
    if (menus) {
      setMenuRoutes(menus);
    }
    // const mergeIdxs: any[] = [];
    // const _menuRoutes = apps.map((item) => {
    //   const routesInfoFromSubIdx = menus.findIndex(
    //     (item2) => item2.title === item.title,
    //   );
    //   let routesInfoFromSub = undefined;

    //   if (routesInfoFromSubIdx > -1) {
    //     mergeIdxs.push(routesInfoFromSubIdx);
    //     routesInfoFromSub = menus[routesInfoFromSubIdx];
    //   }
    //   return { ...item, ...routesInfoFromSub };
    // });
    // return [
    //   ...menus.filter((_, idx) => !mergeIdxs.includes(idx)),
    //   ..._menuRoutes,
    // ];
  }, [menus]);

  useEffect(() => {
    setActiveSubMenu(findActiveSubMenu(curPathname, menuRoutes));
  }, [curPathname, menuRoutes]);

  useEffect(() => {
    if (isInMain) {
      routesDelivery(subname, menuConfig);
    }
  }, []);

  const contentWarp = useMemo(() => {
    if (!isMainApp && !isInMain) {
      return React.createElement('div', { children });
    }
    return apps.length
      ? React.createElement(LayoutContent, {
          appName: findNameByPath(menuItemKey, apps),
          children,
        })
      : null;
  }, [apps.length, menuItemKey]);

  if (isInMain) {
    return children;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {activeSubMenu && (
        <LayoutMenu
          logo={menuLogo}
          title={menuTitle}
          selectedKey={menuItemKey}
          headerHeight={headerHeight}
          activeSubMenu={activeSubMenu}
          menuItemList={(LayoutMenuItem, SubMenu) => {
            function renderItemByItem(routesArr: any[], pathPrefix = '/') {
              return routesArr.map(({ name, title, icon, path, children }) => {
                const menuProps = {
                  key: pathPrefix + (name || path),
                  icon:
                    typeof icon === 'string'
                      ? React.createElement(iconFormatter(icon))
                      : undefined,
                  title: title,
                };
                menuProps.key = menuProps.key.replace(/\/{2,}/g, '/');

                if (Array.isArray(children)) {
                  return (
                    <SubMenu {...menuProps}>
                      {renderItemByItem(children, menuProps.key)}
                    </SubMenu>
                  );
                }
                return (
                  <LayoutMenuItem {...menuProps}>
                    {title}
                    <Link to={menuProps.key}></Link>
                  </LayoutMenuItem>
                );
              });
            }
            return renderItemByItem(menuRoutes);
          }}
          onMenuClick={({ key }) => {
            let _key = String(key);
            setMenuItemKey(_key);
          }}
        />
      )}
      <Layout className="site-layout">
        <header style={{ height: headerHeight }}>
          <PublicHeader />
        </header>
        <Content
          className="site-layout-background"
          style={{
            margin: 16,
            height: '100%',
            backgroundColor: '#fff',
          }}
        >
          {contentWarp}
        </Content>
      </Layout>
    </Layout>
  );
}

function findNameByPath($path: string, $apps: any[]) {
  const appNameRegRes = $path.match(/^\/([\w-]+)\b/);
  if (!appNameRegRes) console.error('解析子应用名字出错');
  if (appNameRegRes) {
    const appName = appNameRegRes[1];
    const findRes = $apps.find((item) => item.name === appName);
    if (findRes) {
      return findRes.name;
    }
  }
  return void 0;
}

function findActiveSubMenu(
  $pathname: string,
  $routesConfig: any[],
): string | undefined {
  if ($pathname === '/') return $pathname;

  let activeSubMenu: string | undefined = undefined;
  // const pathnameRegRes = $pathname.match(/(\/[\w-]+)$/);
  // if (!pathnameRegRes) {
  //   console.error('解析路由地址出错: ' + $pathname);
  //   location.href = '/';
  //   return;
  // }
  for (const iterator of $routesConfig) {
    const { children, name, path, title } = iterator;

    activeSubMenu = name ? '/' + name : path;
    if (
      Array.isArray(children) &&
      children.some((item) => item.path === activeSubMenu)
    ) {
      break;
    }
    if ($pathname === `/${name}` || $pathname === path) {
      activeSubMenu = $pathname;
    }
  }
  return activeSubMenu;
}

const __connect = connect
  ? connect
  : (props: any) => {
      return (BaseComp: any) => {
        return BaseComp;
      };
    };

export default __connect(
  ({ microLayout }: { microLayout: MainAppModelState }) => {
    if (microLayout) {
      return { menus: microLayout.menus, apps: microLayout.apps };
    }
    console.error('no microLayout in main app dva');
    return {};
  },
)(BaseLayout);
