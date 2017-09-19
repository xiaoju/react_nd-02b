import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewpostForm from './NewpostForm'
import { addPost } from '../actions/index'
import { withRouter, Redirect } from 'react-router-dom'

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
