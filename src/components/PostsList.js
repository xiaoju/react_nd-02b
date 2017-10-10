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
        {this.props.visible.map((id)=>(
          <div
            className={'post ' + (this.props.selected === id ? 'showDetails' : 'showNoDetails') }
            key={id}
          >
            <div
              className='title'
              onClick={
                this.props.selected === id ?
                () => this.props.showLess() :
                () => this.props.showMore(id)}
              >
                {this.props.posts.perId[id].title}
            </div>
            <div className='infoLabels'>
              <div
                className='passiveLabels'
                onClick={
                  this.props.selected === id ?
                  () => this.props.showLess() :
                  () => this.props.showMore(id)}
                >
                <div className='category columnContent'>{this.props.posts.perId[id].category}</div>
                <div className='author columnContent'>{this.props.posts.perId[id].author}</div>
                <div className='timestamp columnContent'>{(new Date(this.props.posts.perId[id].timestamp)).toLocaleString()}</div>
                <div className='commentsCount columnContent'>N/A</div>
              </div>
              <VoteButton
                id={id}
                voteScore={this.props.posts.perId[id].voteScore}
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
    selectedCategory: state.comments.selected,
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
