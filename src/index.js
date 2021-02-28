import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import calendarioReducer from './api/calendarioReducer';
import thunk from "redux-thunk"

//const store = createStore(calendarioReducer,compose (applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = createStore( calendarioReducer, compose( applyMiddleware(thunk), window.navigator.userAgent.includes('Chrome') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose, ), )

ReactDOM.render(
    <Provider store={store}>
      <App />    
    </Provider>,
  document.getElementById('root')
);