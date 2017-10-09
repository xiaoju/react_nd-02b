import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectComment,
  voteComment,
  deleteComment,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import VoteButton from './VoteButton'

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
        { this.props.comments.allIds.map((id)=>(
        <div
          key={id}
          className={'post ' + (this.props.comments.selected === id ? 'showDetails' : 'showNoDetails') }
          // onClick={() => this.props.selectComment(id)}
        >
          <div className='body'>{this.props.comments.perId[id].body}</div>

          <div className='infoLabels'>

            <div className='passiveLabels'>
              <div className='timestamp'>{(new Date(this.props.comments.perId[id].timestamp)).toLocaleString()}</div>
              <div className='author'>{this.props.comments.perId[id].author}</div>

              <VoteButton
                id={id}
                voteScore={this.props.comments.perId[id].voteScore}
                voteItem={this.props.voteComment}
              />

              <button
                onClick={()=>this.props.deleteComment(this.props.comments.perId[id].parentId, id)}
                // onClick={()=>console.log('this.props.comments.perId[id].parentId: ',this.props.comments.perId[id].parentId)}
                >
              Delete
              </button>

            </div>
          </div>
        </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    selectComment: selectComment,
    voteComment: voteComment,
    deleteComment: deleteComment,
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsList))
