import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  downloadComments,
  votePost,
  deletePost,
  editPost,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import {
  withRouter,
  Link,
 } from 'react-router-dom'
import VoteButton from './VoteButton'

class PostItem extends Component {

  componentDidMount() {
    this.props.downloadComments(this.props.thisPost.id)
  }

  render() {
    return (
      <div style={{'display': 'flex', 'flex-flow': 'column nowrap'}}>
        <div style={{'display': 'flex', 'flex-flow': 'row nowrap', 'justify-content': 'space-between'}}>
          <div className='title' style={{'order': '1'}}> {this.props.thisPost.title} </div>
            <div style={{'order': '2'}}>
              <Link
                style={{'order': '2'}}
                className='button'
                to={`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`}
                >details
              </Link>
              <button
                style={{'order': '3'}}
                onClick={() => this.props.deletePost(this.props.thisPost.id)}
                className="button">
                delete
              </button>
              <Link
                style={{'order': '4'}}
                to={`/editpost/${this.props.thisPost.id}`}
                className="button">edit</Link>
          </div>
        </div>
        <div className='passiveLabels'>
          <div className='category columnContent'>{this.props.thisPost.category}</div>
          <div className='author columnContent'>{this.props.thisPost.author}</div>
          <div className='timestamp columnContent'>{(new Date(this.props.thisPost.timestamp)).toLocaleString()}</div>
          <div className='commentsCount columnContent'>{this.props.commentsCount[this.props.thisPost.id]}</div>
          <VoteButton
            id={this.props.thisPost.id}
            voteScore={this.props.thisPost.voteScore}
            voteItem={this.props.votePost}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPost: state.posts.selected,
    selectedCategory: state.categories.selected,
    commentsCount: state.comments.commentsCount,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    downloadComments: downloadComments,
    votePost: votePost,
    deletePost: deletePost,
    editPost: editPost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem))

PostItem.propTypes = {
  thisPost: PropTypes.object.isRequired,

  selectedPost: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  commentsCount: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
}
