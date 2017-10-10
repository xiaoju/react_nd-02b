import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
  showMore,
  showLess,
  votePost,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import VoteButton from './VoteButton'

class PostsList extends Component {

  render() {

    if (this.props.posts.visible.length === 0) {
      return (
        <div className='postsList defaultMessage'>
          Select another category<br /> or <br />press 'New Post' to add content!
        </div>
      )
    }

    return (
      <div className='postsList'>
        {this.props.visible.map((postId)=>(
          <div
            className={'post ' + (this.props.selected === postId ? 'showDetails' : 'showNoDetails') }
            key={postId}
          >
            <div
              className='title'
              onClick={
                this.props.selected === postId ?
                () => {
                  this.props.showLess();
                  this.props.history.push(`/${this.props.selectedCategory}`)
                }
                :
                () => this.props.showMore(postId)
                .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${postId}`) )
              }
              >
                {this.props.posts.perId[postId].title}
            </div>
            <div className='infoLabels'>
              <div
                className='passiveLabels'
                onClick={
                  this.props.selected === postId ?
                  () => {
                    this.props.showLess();
                    this.props.history.push(`/${this.props.selectedCategory}`)
                  }
                  :
                  () => this.props.showMore(postId)
                  .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${postId}`) )
                }
                >
                <div className='category columnContent'>{this.props.posts.perId[postId].category}</div>
                <div className='author columnContent'>{this.props.posts.perId[postId].author}</div>
                <div className='timestamp columnContent'>{(new Date(this.props.posts.perId[postId].timestamp)).toLocaleString()}</div>
                <div className='commentsCount columnContent'>N/A</div>
              </div>
              <VoteButton
                id={postId}
                voteScore={this.props.posts.perId[postId].voteScore}
                voteItem={this.props.votePost}
              />
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
    posts: state.posts,
    selected: state.posts.selected,
    selectedCategory: state.categories.selected,
    visible: state.posts.visible,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    showLess: showLess,
    showMore: showMore,
    votePost: votePost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList))
