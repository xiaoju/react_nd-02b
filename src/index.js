import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import postsReducer from './reducers'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  postsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
