import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../css/App.css'
import PostForm from './PostForm'
import MainPage from './MainPage'

class App extends Component {
  render() {
    return (
      <div className='app' >
        <Switch>
          <Route exact path='/newpost' component={PostForm} />
          <Route path='/:category?/:id?' component={MainPage} />
        </Switch>
      </div>
    )
  }
}

export default App
