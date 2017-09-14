import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import readableApp from './reducers'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  readableApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
