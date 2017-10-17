import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editPost,
  deletePost
} from '../actions/index'
import { withRouter, Link } from 'react-router-dom'

class PostsToolbar extends Component {

  constructor(props) {
    super(props)
    this.deletePostButton = this.deletePostButton.bind(this)
    this.editPostButton = this.editPostButton.bind(this)
  }

  deletePostButton() {
    return (
      this.props.selected ?
      <button
        onClick={() => this.props.deletePost(this.props.selected)}
        className="button">
        Delete Post
      </button>
      :
      <button
        className="button inactive_button">
        Delete Post
      </button>
    )
  }

  editPostButton() {
    return (
      this.props.selected ?
      <Link to={`/editpost/${this.props.selected}`} className="button">Edit Post</Link>
      :
      <button
        className="button inactive_button">
        Edit Post
      </button>
    )
  }

  render() {
    return (
      <div className='postsToolbar'>
        {/* {this.deletePostButton()}
        {this.editPostButton()} */}
        <Link
          to="/newpost"
          className="button"
          style={{
            backgroundColor: 'rgb(157, 165, 180)',
            color: 'black',
          }}
          >Press here to create a New Post!!!
        </Link>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selected: state.posts.selected,
    visible: state.posts.visible
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     deletePost: deletePost,
     editPost: editPost,
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsToolbar))
