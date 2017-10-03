import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteComment, editComment, newComment } from '../actions/index'
import {
  withRouter,
  // Link,
} from 'react-router-dom'

class CommentsToolbar extends Component {

  constructor(props) {
    super(props)
    this.deleteCommentButton = this.deleteCommentButton.bind(this)
    this.editCommentButton = this.editCommentButton.bind(this)
    // this.newCommentButton = this.newCommentButton.bind(this)
  }

  deleteCommentButton() {
    return (
      this.props.commentId ?
      <button
        onClick={() => this.props.deleteComment(this.props.postId, this.props.commentId)}
        className="button">
        Delete Comment
      </button>
      :
      <button
        className="button inactive_button">
        Delete Comment
      </button>
    )
  }

  editCommentButton() {
    return (
      this.props.commentId ?
      <button
        onClick={() => this.props.editComment(this.props.postId, this.props.commentId)}
        className="button">
        Edit Comment
      </button>
      :
      <button
        className="button inactive_button">
        Edit Comment
      </button>
    )
  }

  // newCommentButton() {
  //   return (
  //     <button
  //       className="button"
  //       onClick={() => this.props.newComment(this.props.postId)}
  //       >
  //       New Comment
  //     </button>
  //   )
  // }

  render() {
    return (
      <div className='commentsToolbar'>
        {this.deleteCommentButton()}
        {this.editCommentButton()}
        {/* {this.newCommentButton()} */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    commentId: state.comments.selected,
    postId: state.posts.selected
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     deleteComment: deleteComment,
     editComment: editComment,
    //  newComment: newComment,
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsToolbar));
