//import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk'
import 'es6-promise/auto'
import 'setimmediate'
//import 'chartist-plugin-tooltip'

import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'

import Layout from 'components/LayoutComponents/Layout'
import reducer from 'reducers'
//import reducer from 'reducers/reducer'

import 'resources/_antd.less' // redefinition AntDesign variables
import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap styles

import 'resources/AntStyles/AntDesign/antd.cleanui.scss'
import 'resources/CleanStyles/Core/core.cleanui.scss'
import 'resources/CleanStyles/Vendors/vendors.cleanui.scss'

import 'resources/binger.scss'
import config from 'lib/config';

import firebase from 'firebase'
var firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: "binger-e4fea.firebaseapp.com",
  databaseURL: "https://binger-e4fea.firebaseio.com",
  projectId: "binger-e4fea",
  storageBucket: "binger-e4fea.appspot.com",
  messagingSenderId: "100930507189"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

const history = createHistory();
const router = routerMiddleware(history);
const middlewares = [router, thunk];
const isLogger = false;
if (isLogger && process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger)
}
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enGB}>
        <div>
          <Helmet titleTemplate="Binger - %s" />
          <Layout />
        </div>
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

export default history
