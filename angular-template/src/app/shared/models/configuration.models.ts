import { InjectionToken } from '@angular/core';

interface IAuthConfig {
  /** The route that the app should navigate to if the user is not authenticated */
  loginRoute: string;
  /** The default route that the app should navigate to if the user is authenticated */
  defaultRoute: string;
  /** (e.g. auth/token) */
  authTokenUrl: string;
}

export interface IMetaTagConfig {
  [name: string]: string;
}

export interface IAppConfig {
  appName: string;
  apiUrl: string;
  version: string;
  authConfig?: IAuthConfig;
  defaultMetaTags?: IMetaTagConfig;
  stripeApiKey: string;
}

export const APP_CONFIG = new InjectionToken<IAppConfig>('app_config');
