import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../css/App.css'
import MainPage from './MainPage'
import PostForm from './PostForm'
import EditPostForm from './EditPostForm'

class App extends Component {
  render() {
    return (
      <div className='app' >
        <Switch>
          <Route exact path='/newpost' component={PostForm} />
          <Route exact path='/editpost/:id' component={EditPostForm} />
          <Route path='/:category?/:id?' component={MainPage} />
        </Switch>
      </div>
    )
  }
}

export default App
