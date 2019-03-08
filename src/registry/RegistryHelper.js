import {registerReducer} from '../store/configureStore';

/**
 * Helper for state registry.
 */
const RegistryHelper = {

    /**
     * Helper that returns higher order function
     * that when invoked loads requested module.
     * @param {Object} store 
     */
    loadModule(store) {
      return function(name, moduleProvider) {
          if(module.hasOwnProperty(name)) {
            return Promise.resolve(module[name]);
          } else {
            return moduleProvider.then(mod => {
              registerReducer(store, name, mod.reducer);
              return mod;
            });
          }
      }
    }
};

export default RegistryHelper;