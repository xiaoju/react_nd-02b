import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../css/App.css'
import NewpostPage from './NewpostPage'
import MainPage from './MainPage'

// react router with redux:
// http://redux.js.org/docs/advanced/UsageWithReactRouter.html
// https://reacttraining.com/react-router/web/guides/redux-integration


// react-router pass the params through props to your components so you just
 // need the get the category_id from this.props.match.params.category_id then
 // in the component did mount method call the endpoint to get all the post
 // for that category


class App extends Component {
  render() {
    return (
      <div className='app' >
        <Switch>
          <Route exact path='/newpost' component={NewpostPage} />
          <Route path='/:category?/:post_id?' component={MainPage} />
        </Switch>
      </div>
    )
  }
}

export default App
