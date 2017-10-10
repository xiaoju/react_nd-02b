import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  // selectComment,
  voteComment,
  deleteComment,
  // editComment,
  showMore,
  showEditCommentForm,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import VoteButton from './VoteButton'
import SimpleEditCommentForm from './SimpleEditCommentForm'

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
      <div>
        <div className='commentsList'>
          { this.props.comments.allIds.map((commentId)=>(
          <div
            key={commentId}
            className='commentItem'
            // className={'post ' + (this.props.comments.selected === commentId ? 'showDetails' : 'showNoDetails') }
            // onClick={() => this.props.selectComment(commentId)}
          >

          {
            // this.props.showingEditCommentForm ?
            this.props.editingCommentId === commentId ?

            <SimpleEditCommentForm
              commentId={commentId}
              postId={this.props.comments.perId[commentId].parentId}
              author={this.props.comments.perId[commentId].author}
              timestamp={this.props.comments.perId[commentId].timestamp}
              body={this.props.comments.perId[commentId].body}
            />

            :

            <div>
              <div className='body'>{this.props.comments.perId[commentId].body}</div>
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
                    onClick={
                      // ()=>this.props.deleteComment(this.props.comments.perId[commentId].parentId, commentId)
                      // ()=>console.log('commentId: ', commentId)
                      ()=>this.props.deleteComment(commentId)
                      .then(()=>this.props.showMore(this.props.selectedPost))
                    }
                    >
                  Delete
                  </button>
                  <button
                    onClick={() => this.props.showEditCommentForm(
                      {
                        commentId: commentId,
                        postId: this.props.comments.perId[commentId].parentId,
                        body: this.props.comments.perId[commentId].body,
                      })}
                    >
                  Edit
                  </button>
                </div>
              </div>
            </div>


          }


          </div>
          ))}
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    // showingEditCommentForm: state.editCommentFormReducer.showingEditCommentForm,
    editingCommentId: state.editCommentFormReducer.commentId,
    // showingEditCommentForm: state.ui.showingEditCommentForm,
    selectedCategory: state.categories.selected,
    selectedPost: state.posts.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    // selectComment: selectComment,
    voteComment: voteComment,
    deleteComment: deleteComment,
    showEditCommentForm: showEditCommentForm,
    showMore: showMore,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsList))
