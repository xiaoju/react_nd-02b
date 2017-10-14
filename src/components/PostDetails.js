import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  downloadComments,
  showMorePlus,
  showLess,
  votePost,
  deletePost,
  editPost,
 } from '../actions/index'
 import VoteButton from './VoteButton'
 import { bindActionCreators } from 'redux'
 import {
   withRouter,
   Link,
  } from 'react-router-dom'

class PostDetails extends Component {

  componentDidMount() {
    this.props.downloadComments(this.props.thisPost.id)
  }

  render() {
    return (

  <div className='details'>
    ugly title:
    <div className='uglyDetails'>{this.props.thisPost.title}</div>
    <br />
    ugly body:
    <div className='body'>{this.props.thisPost.body}</div>
    <br />
    ugly score:
    <VoteButton
      id={this.props.thisPost.id}
      voteScore={this.props.thisPost.voteScore}
      voteItem={this.props.votePost}
    />
    <br />
    ugly time:
    <div className='uglyDetails'>{(new Date(this.props.thisPost.timestamp)).toLocaleString()}</div>
    <br />
    ugly author:
    <div className='uglyDetails'>{this.props.thisPost.author}</div>
    <br />
    ugly comments count:
    <div className='uglyDetails'>{this.props.commentsCount[this.props.thisPost.id]}</div>
    <br />
    <button
      onClick={() => {
        this.props.history.push(`/${this.props.selectedCategory}`);
        this.props.showLess();
      }}
      className="uglyButton">
      HIDE ugly
    </button>
  </div>
)}}

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
    showLess: showLess,
    showMorePlus: showMorePlus,
    votePost: votePost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
