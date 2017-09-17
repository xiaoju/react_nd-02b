import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import App from './components/App'
// import './css/index.css'
import appReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'))

registerServiceWorker()
