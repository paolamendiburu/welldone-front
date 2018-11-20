import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import i18n from './i18n';
import { getData } from './api/index';

const { store, persistor } = configureStore();

const fetch = ['categories', 'users', 'comments', 'favorites'];
fetch.forEach(item => store.dispatch(getData(item, item, 'All')));

const Preloader = () => <div>loading...</div>;
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
