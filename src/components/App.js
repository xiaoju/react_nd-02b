import React, { Component } from 'react'
import PostsList from './PostsList'
import '../css/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostsList />
      </div>
    )
  }
}

export default App
