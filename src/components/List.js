import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
  selectPost,
  fetchComments,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

  render() {

    if (this.props.Posts.allIds.length === 0) {
      return (
        <div className='list defaultMessage'>
          Press 'New Post' to add content!
        </div>
      )
    }

    if (this.props.Posts.VisibleIds.length === 0) {
      return (
        <div className='list defaultMessage'>
          Select another category<br /> or <br />press 'New Post' to add content!
        </div>
      )
    }

    return (
      <div className='list'>
        {this.props.Posts.VisibleIds.map((id)=>(
          <div
            key={id}
            role='button'
            tabIndex='0'        /* to allow navigation with keyboard, but still BUG not clickable! */
            onClick={
              // () => this.props.selectPost(this.props.Posts.perId[id].id)
              () => {this.props.selectPost(id); this.props.fetchComments(id)}
            }
            className={'post ' + (this.props.Posts.SelectedIds.includes(id) ? 'selected' : 'unselected') }
            >
            <div className='title'>{this.props.Posts.perId[id].title}</div>
            <div className='author'>{this.props.Posts.perId[id].author}</div>
            <div className='timeStamp'>{this.props.Posts.perId[id].timestamp}</div>
            <div className='voteScore'>{this.props.Posts.perId[id].voteScore}</div>
          </div>
        ))
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Posts: state.Posts,
    SelectedPath: state.Categories.SelectedPath
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    selectPost: selectPost,
    fetchComments: fetchComments,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
