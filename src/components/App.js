import React, { Component } from 'react'
import List from './List'
import ListToolbar from './ListToolbar'
import '../css/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <List />
        <ListToolbar />
      </div>
    )
  }
}

export default App
