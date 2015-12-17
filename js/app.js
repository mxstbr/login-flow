/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../serviceworker-cache-polyfill.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'file?name=[name].[ext]!../.htaccess';
import 'file?name=[name].[ext]!../favicon.ico';
import 'file?name=[name].[ext]!../favicon.png';

// Check for ServiceWorker support before trying to install it
if ('serviceWorker' in navigator) {
    // Install ServiceWorker
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
  }).catch((err) => {
    // Installation failed
    console.log('ServiceWorker registration failed, error:', err);
  });
} else {
  // No ServiceWorker Support
  console.log('ServiceWorker is not supported in this browser');
}

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { homeReducer } from './reducers/reducers';
import { Router, Route, IndexRoute } from 'react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from './utils/history';

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
// which swaps out the fonts
const openSansObserver = new FontFaceObserver('Open Sans');

openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, (err) => {
  document.body.classList.remove('js-open-sans-loaded');
});

// Import the components used as pages
import HomePage from './components/pages/HomePage.react';
import LoginPage from './components/pages/LoginPage.react';
import RegisterPage from './components/pages/RegisterPage.react';
import Dashboard from './components/pages/Dashboard.react';
import NotFound from './components/pages/NotFound.react';
import App from './components/App.react';

// Import the CSS file, which webpack transfers to the build folder
import '../css/main.css';

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
