import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/configureStore';
import App from './App';
//import { unregister as unregisterServiceWorker } from './registerServiceWorker';

/**
 * Entry point for the app.
 */
ReactDOM.render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>, document.getElementById('root'));

// registerServiceWorker(); // Disable service worker to avoid index html precache
//unregisterServiceWorker();