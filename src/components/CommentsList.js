import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectComment,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class CommentsList extends Component {

  render() {
    if (this.props.comments.allIds.length === 0) {
      return (
        <div className='comments defaultMessage'>
          <br />
          No comment yet, please add one!
          <br />
        </div>
      )
    }

    return (
      <div className='comments'>
        <br />
        { this.props.comments.allIds.map((commentId)=>(
          <div
            key={commentId}
            className={'post ' + (this.props.comments.selected === commentId ? 'showDetails' : 'showNoDetails') }
            onClick={() => this.props.selectComment(commentId)}
            >
            <div>
              <div className='body'>{this.props.comments.perId[commentId].body}</div>
                <div className='infoLabels'>
                  <div className='timeStamp'>{this.props.comments.perId[commentId].timestamp}</div>
                  <div className='author'>{this.props.comments.perId[commentId].author}</div>
                  <div className='voteScore'>{this.props.comments.perId[commentId].voteScore}</div>
                </div>
            </div>
          </div>
        ))
        }
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
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsList))
