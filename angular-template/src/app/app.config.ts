import { IAppConfig } from './shared/models/configuration.models';
import { environment } from '../environments/environment';

export class AppConfig implements IAppConfig {
    apiUrl = environment.apiUrl;
    appName = 'Template Angular Web App';
    version = '1.0.0';
    stripeApiKey = environment.stripeApiKey;
    authConfig = {
        loginRoute: '/users/login',
        defaultRoute: '',
        authTokenUrl: 'users/login'
    };
    defaultMetaTags = {
    };
}