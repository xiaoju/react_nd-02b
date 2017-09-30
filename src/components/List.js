import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
  selectOneForDeletion,
  fetchComments,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

  render() {

    if (this.props.posts.allIds.length === 0) {
      return (
        <div className='list defaultMessage'>
          Press 'New Post' to add content!
        </div>
      )
    }

    if (this.props.posts.visible.length === 0) {
      return (
        <div className='list defaultMessage'>
          Select another category<br /> or <br />press 'New Post' to add content!
        </div>
      )
    }

    return (
      <div className='list'>
        {this.props.posts.visible.map((id)=>(
          <div
            key={id}
            role='button'
            tabIndex='0'        /* to allow navigation with keyboard, but still BUG not clickable! */
            
            // onFocus={() => this.props.fetchComments(id)}

              // () => {this.props.selectPost(id); this.props.fetchComments(id)}
            // className={'post ' + (this.props.posts.toDelete.includes(id) ? 'selected' : 'unselected') }
            className='post'
            >
            <div className='title'>{this.props.posts.perId[id].title}</div>
            <div className='author'>{this.props.posts.perId[id].author}</div>
            <div className='timeStamp'>{this.props.posts.perId[id].timestamp}</div>
            <div className='voteScore'>{this.props.posts.perId[id].voteScore}</div>
            <button
              onClick={() => this.props.selectOneForDeletion(id)}
              className={(this.props.posts.toDelete.includes(id) ? 'selected' : 'unselected') }
              >
              Selected for deletion
            </button>
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
    selectedPath: state.categories.selected
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    selectOneForDeletion: selectOneForDeletion,
    fetchComments: fetchComments,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
