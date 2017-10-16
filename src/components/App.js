import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../css/App.css'
import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import DetailsContainer from './DetailsContainer'
import PostsContainer from './PostsContainer'

class App extends Component {
  render() {
    return (
      <div className='app' >
        <div className = 'mainPage'>
          <Switch>
            <Route exact path='/' component={PostsContainer} />
            <Route path='/newpost' component={NewPostForm} />
            <Route path='/editpost/:id' component={EditPostForm} />
            <Route exact path='/:category/' component={PostsContainer} />
            <Route path='/:category/:id' component={DetailsContainer} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
