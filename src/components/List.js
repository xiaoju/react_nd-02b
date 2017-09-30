import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCatPosts,
  fetchAllPosts,
  selectOneForDeletion,
  showMore,
  showLess,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

  constructor(props) {
    super(props)
    this.toggleButton = this.toggleButton.bind(this)
  }

  toggleButton(id) {
    switch (this.props.selectedForDetails === id) {
      case true:
        return (
        <button
          className="button"
          onClick={() => this.props.showLess(id)}
          >
          Show Less
        </button>)
      default:
        return (
        <button
          onClick={() => this.props.showMore(id)}
          className="button"
          >
          Show More
        </button>)
    }
  }

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
      <div className='postsList'>
        {this.props.visible.map((id)=>(
          <div key={id}
            className={'post ' + (this.props.selectedForDetails === id ? 'showDetails' : 'showNoDetails') }>
            <div>
              <div className='title'>{this.props.posts.perId[id].title}</div>
              <div className='author'>{this.props.posts.perId[id].author}</div>
              <div className='timeStamp'>{this.props.posts.perId[id].timestamp}</div>
              <div className='voteScore'>{this.props.posts.perId[id].voteScore}</div>
            </div>

            {this.toggleButton(id)}

            <button
              onClick={() => this.props.selectOneForDeletion(id)}
              className={'button '+ (this.props.toDelete.includes(id) ? 'selected' : 'unselected') }
              >
              To Delete
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
    toDelete: state.posts.toDelete,
    visible: state.posts.visible,
    selectedForDetails: state.posts.selectedForDetails,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    selectOneForDeletion: selectOneForDeletion,
    showMore: showMore,
    showLess: showLess,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
