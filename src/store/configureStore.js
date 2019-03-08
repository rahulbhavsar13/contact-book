import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import DatabaseService from '../services/DatabaseService';
import rootSaga from '../sagas/index';
import rootReducer from '../reducers/index';
import RouterConfig from '../routes/RouterConfig';

/**
 * The current version of the app/store. This will be used to invalidate
 * older caches once a new app version is deployed.
 */
const currentStoreVersion = process.env.REACT_APP_UI_VERSION;

/**
 * Persist state to local Storage, to facilitate browser refresh.
 */
const persistedState = DatabaseService.loadState();

if(persistedState) {
  let currentRoute = RouterConfig.routes[0]; // Consider home as default route
  for (let i = 1; i < RouterConfig.routes.length; i++){ // Check for current route from browser URL
    if(window.location.href.indexOf(RouterConfig.routes[i]['path']) > -1) {
      currentRoute = RouterConfig.routes[i];
      break;
    }
  }
  if(persistedState.state && persistedState.state.reducer && 
    persistedState.state.reducer.primaryNavigation !== currentRoute['state']) { //Check current route with persisted primary navigation
    persistedState.state.reducer.primaryNavigation = currentRoute['state'];
  }
}


/**
 * Setup the middleware to watch between the Reducers and the Actions.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Redux DevTools - dev only.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Register saga middleware to bridge actions & reducers.
 */
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

/**
 * Default export for the app's store management.
 */
export default (() => {
  // Creates the Redux reducer with the redux-saga middleware, and redux dev tools support
  const store = createStore(
    rootReducer, 
    canImportSavedState(persistedState) ? persistedState.state : {},
    enhancer // Redux DevTools  and Saga middleware
  );

  //On state change update/load state to localStorage
  store.subscribe(throttle(() => {
    DatabaseService.saveState(getStateToSave(store));
  }), 1000);

  // Create hook for async sagas
  store.async = {};
  
  // Begin our Index Saga
  store.runSaga = sagaMiddleware.run(rootSaga);

  return store;
})();


//set new reducers (on the async property) and the substitutes the main one with it
export function registerReducer(store, name, reducer) {
  if(reducer !== undefined){
      store.async[name] = reducer;
      store.replaceReducer(createReducer(store.async));
  }
}

//Define initial reducer
//setup the bare setup of our store/state
function createReducer (reducers) {
  return combineReducers({
    reducer: (state=null) => state,
    ...reducers
  });
}

/**
 * Wraps the state object in a container object with 
 * additional metadata such as current version.
 * @param {object} store 
 */
function getStateToSave(store) {
  let state = {...store.getState()};
  state.apps = {};
  return {
    version: currentStoreVersion,
    state: state
  }
}

/**
 * Checks if the saved state can be imported onto/applied to 
 * default definitions.
 * In case of a mismatch, it also clears logged-in session and stale state.
 * 
 * @param {object} savedState 
 */
function canImportSavedState(savedState) {
  const canImportSavedState = savedState && savedState.version && savedState.version === currentStoreVersion;
  if (!canImportSavedState) {
    DatabaseService.clear();
  }
  return canImportSavedState;
}