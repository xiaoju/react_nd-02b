import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewpostForm from './NewpostForm'
import { addPost } from '../actions/index'
import { withRouter, Redirect } from 'react-router-dom'
import MainPage from './MainPage'

// how to redirect afte form submission:
// https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4

class NewpostPage extends Component {

  submit = (values) => {
    console.log(values)
    this.props.addPost(values)
  }

  render() {
    return (
      <NewpostForm onSubmit={this.submit} />
    )
  }

}

function mapStateToProps(state) {
  return {
    allIds: state.Posts.allIds
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     addPost: addPost
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewpostPage));
