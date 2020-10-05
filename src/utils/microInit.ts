import MicroStorage from '@grfe/micro-store';

export function routesDelivery(appname: string, routesConfig: any) {
  if (!!appname) {
    const ss = new MicroStorage({ state: {}, name: appname });
    ss.set('MAIN_APP/routes/' + appname, routesConfig);
  }
}
