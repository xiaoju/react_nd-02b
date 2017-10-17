import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  votePost,
  deletePost,

 } from '../actions/index'
 import VoteButton from './VoteButton'
 import { bindActionCreators } from 'redux'
 import {
   withRouter,
   Link,
  } from 'react-router-dom'

class PostDetails extends Component {

  render() {
    const empty = {
      title: '',
      body: '',
      author: '',
      timestamp: '',
      commentsCount: '',
    }
    const thisPost=this.props.posts.perId[this.props.postId] || empty
    // above line to avoid crash of app if coming to app directly onto specific post
    return (
      <div className='details'>
        <div className='title'>{thisPost.title}</div>
        <br />
        <div className='body'>{thisPost.body}</div>
        <br />
        <VoteButton
          id={thisPost.id}
          voteScore={thisPost.voteScore}
          voteItem={this.props.votePost}
        />
        <br />
        <div className='timestamp'>{(new Date(thisPost.timestamp)).toLocaleString()}</div>
        <br />
        Author:
        <div className='author'>{thisPost.author}</div>
        <br />
        Comments count:
        <div className='commentsCount'>{this.props.commentsCount[thisPost.id]}</div>
        <br />
        <Link className='button' to={`/${this.props.currentCategory}`}>Back</Link>
        <button
          onClick={() =>
            {
            this.props.deletePost(thisPost.id)
            this.props.history.push(`/${this.props.selectedCategory}`)
            }
          }
          className="button">
          Delete Post
        </button>
        <Link to={`/editpost/${thisPost.id}`} className="button">Edit Post</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    commentsCount: state.comments.commentsCount,
    posts: state.posts,
    selectedCategory: state.categories.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    votePost: votePost,
    deletePost: deletePost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))

PostDetails.propTypes = {
  postId: PropTypes.string.isRequired,
  currentCategory: PropTypes.string.isRequired,
  posts: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
}
