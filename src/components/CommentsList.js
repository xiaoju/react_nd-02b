import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  voteComment,
  deleteComment,
  showMorePlus,
  showEditCommentForm,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import VoteButton from './VoteButton'
import EditCommentForm from './EditCommentForm'

class CommentsList extends Component {

  render() {
    if (this.props.comments.allIds.length === 0) {
      return (
        <div className='commentsList defaultMessage'>
          No comment yet, please add one!
        </div>
      )
    }

    return (
      <div className='commentsList'>
        { this.props.comments.allIds.map((commentId)=>(
        <div
          key={commentId}
          className='commentItem'
        >
        {
          this.props.editingCommentId === commentId ?
            <EditCommentForm
              commentId={commentId}
              postId={this.props.comments.perId[commentId].parentId}
              author={this.props.comments.perId[commentId].author}
              timestamp={this.props.comments.perId[commentId].timestamp}
              body={this.props.comments.perId[commentId].body}
            />
          :
            <div>
              <div className='commentBody'>{this.props.comments.perId[commentId].body}</div>
              <div className='infoLabels'>
                <div className='passiveLabels'>
                  <div className='timestamp'>{(new Date(this.props.comments.perId[commentId].timestamp)).toLocaleString()}</div>
                  <div className='author'>{this.props.comments.perId[commentId].author}</div>
                  <VoteButton
                    id={commentId}
                    voteScore={this.props.comments.perId[commentId].voteScore}
                    voteItem={this.props.voteComment}
                  />
                  <button
                    className='button'
                    onClick={
                      ()=>this.props.deleteComment(commentId)
                        .then(()=>this.props.showMorePlus(this.props.selectedPost))
                    }
                    >Delete
                  </button>
                  <button
                    className='button'
                    onClick={() => this.props.showEditCommentForm(
                      {
                        commentId: commentId,
                        postId: this.props.comments.perId[commentId].parentId,
                        body: this.props.comments.perId[commentId].body,
                      })}
                    >Edit
                  </button>
                </div>
              </div>
            </div>
        }
        </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    editingCommentId: state.editCommentFormReducer.commentId,
    selectedCategory: state.categories.selected,
    selectedPost: state.posts.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    voteComment: voteComment,
    deleteComment: deleteComment,
    showEditCommentForm: showEditCommentForm,
    showMorePlus: showMorePlus,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsList))
