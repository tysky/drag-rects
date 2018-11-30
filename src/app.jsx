import React from 'react';
import ReactDOM from 'react-dom';
// import { applyMiddleware, createStore, compose } from 'redux';
// import { Provider } from 'react-redux';
// import reducers from './reducers';
import App from './components/App';

export default () => {
/* eslint-disable no-underscore-dangle */
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  // const store = createStore(
  //   reducers,
  //   composeEnhancers(
  //     applyMiddleware(thunk),
  //   ),
  // );


  // ReactDOM.render(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>,
  //   document.getElementById('container'),
  // );
  ReactDOM.render(
    <App />,
    document.getElementById('container'),
  );
};
