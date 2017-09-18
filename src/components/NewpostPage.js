import React, { Component } from 'react'
import NewpostForm from './NewpostForm'

class NewpostPage extends Component {

  submit = (values) => {
    // print the form values to the console
    console.log(values)
  }

  render() {
    return (
      <NewpostForm onSubmit={this.submit} />
    )
  }

}

export default NewpostPage
