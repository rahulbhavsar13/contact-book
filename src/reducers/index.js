import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactReducer from './contactReducer';

/**
 * Root reducer for the application post user login.
 * @param {Object} state 
 * @param {Object} action 
 */
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

/**
 * Combines all the reducers for the app.
 */
const appReducer = combineReducers({
    form: formReducer,
    contact: contactReducer
});

export default rootReducer;