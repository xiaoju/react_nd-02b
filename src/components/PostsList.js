import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import OnePost from './OnePost'

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
            key={postId}
            className={'post ' + (this.props.selectedPost === postId ? 'showDetails' : 'showNoDetails')}
          >
            <OnePost
              thisPost={this.props.posts.perId[postId]}
            />
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
    selectedPost: state.posts.selected,
    selectedCategory: state.categories.selected,
    visible: state.posts.visible,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList))
