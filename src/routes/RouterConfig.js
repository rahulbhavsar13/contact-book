import store from '../store/configureStore';
import { RegistryHelper } from '../registry';
import * as AppConstants from '../utils/AppConstants';

const register = RegistryHelper.loadModule(store);
const Contact = () => register('reducers', import('../contact-list'));

/*
 * Common route configuration for all app url routes
 */
const RouterConfig = {

    routes: [
        {
            path: AppConstants.APP_ROUTE,
            state: AppConstants.APP_STATE_HOME,
            main: Contact,
            exact: true,
            default: true
        }
    ]
}

export default RouterConfig;