import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import '../css/App.css'
import NewpostPage from './NewpostPage'
import MainPage from './MainPage'

// react router with redux:
// http://redux.js.org/docs/advanced/UsageWithReactRouter.html
// https://reacttraining.com/react-router/web/guides/redux-integration

class App extends Component {
  render() {
    return (
      <div className='app' >
        <Switch>
          <Route exact path='/newpost' component ={NewpostPage} />
          <Route path='/:category?/:post_id?' component = {MainPage} />
        </Switch>
      </div>
    )
  }
}

export default App
