import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewpostForm from './NewpostForm'
import { addPost } from '../actions/index'
import { withRouter, Redirect } from 'react-router-dom'
import MainPage from './MainPage'
import { Link } from 'react-router-dom'

// how to redirect afte form submission:
// https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4

class NewpostPage extends Component {

  submit = (values) => {
    this.props.addPost(values)
    // BUG post doesn't appear in the list after it got created
  }

  render() {
    return (
      <div>
        <NewpostForm onSubmit={this.submit} />
        <Link
          to={
            '/' +
            this.props.SelectedCatName +
            // if SelectedCategory is null, put 'null' in URL
            '/' +
            ((this.props.SelectedIds.length === 0) ? ('') : (this.props.SelectedIds[0]))
            // if state.Posts.SelectedIds is an empty array, then put '' in the address instead of post id (= 'undefined')
           }
          className='button'
          >Cancel
        </Link>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    allIds: state.Posts.allIds,
    SelectedCatName: state.Categories.SelectedPath,
    SelectedIds: state.Posts.SelectedIds
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     addPost: addPost
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewpostPage));
