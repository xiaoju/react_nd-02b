import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import App from './components/App'
import appReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import ReduxPromise from 'redux-promise'

// // before adding reduxPromise
// const store = createStore(
//   appReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const CreateStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

const store = CreateStoreWithMiddleware(
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
