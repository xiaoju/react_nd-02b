import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
  showMore,
  showLess,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class PostsList extends Component {

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
      <div>
        {this.props.visible.map((id)=>(
          <div
            key={id}
            className={'post ' + (this.props.selected === id ? 'showDetails' : 'showNoDetails') }
            onClick={
              this.props.selected === id ?
              () => this.props.showLess() :
              () => this.props.showMore(id)
            }
          >
            <div>
              <div className='title'>{this.props.posts.perId[id].title}</div>
                <div className='infoLabels'>
                  <div className='category'>{this.props.posts.perId[id].category}</div>
                  <div className='author'>{this.props.posts.perId[id].author}</div>
                  <div className='timestamp'>{(new Date(this.props.posts.perId[id].timestamp)).toLocaleString()}</div>
                  <div className='commentsCount'>N/A</div>
                  <div className='voteScore'>{this.props.posts.perId[id].voteScore}</div>
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
    posts: state.posts,
    selected: state.posts.selected,
    visible: state.posts.visible,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    showLess: showLess,
    showMore: showMore,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsList))
