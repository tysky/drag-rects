import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/App';
import rectSize from './defaultRectSize';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  ReactDOM.render(
    <Provider store={store}>
      <App rectSize={rectSize} />
    </Provider>,
    document.getElementById('container'),
  );
};
