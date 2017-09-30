import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectComment,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class Comments extends Component {

  render() {

    if (this.props.comments.visible === []) {
      return (
        <div className='list defaultMessage'>
          Press 'New' to add a comment!
        </div>
      )
    }

    return (
      <div className='comments'>
        {this.props.comments.visible.map((commentId)=>(
          <div key={commentId}
            className={'post ' + (this.props.comments.selected === commentId ? 'showDetails' : 'showNoDetails') }
            onClick={() => this.props.selectComment(commentId)}
            >
            <div>
              <div className='body'>{this.props.comments.perId[commentId].body}</div>
              <div className='timeStamp'>{this.props.comments.perId[commentId].timestamp}</div>
              <div className='author'>{this.props.comments.perId[commentId].author}</div>
              <div className='voteScore'>{this.props.comments.perId[commentId].voteScore}</div>
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
)(Comments))
