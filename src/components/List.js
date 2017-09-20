import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPost } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

// TODO
// if post just got added, or app just started,
// then need initialize what are the selected category, and what are the VisibleIds

  render() {


    // TODO add lifecycle stuff when page mounts: pass URL parameters into state


    if (this.props.Posts.allIds.length === 0) {
      return (
        <div className='list'>
          <div className='defaultMessage'>
            Press 'New Post' to add content!
          </div>
        </div>
      )
    }

    if (this.props.Posts.VisibleIds.length === 0) {
      return (
        <div className='list'>
          <div className='defaultMessage'>
            Select another category
          </div>
          <div className='defaultMessage'>
            or
          </div>
          <div className='defaultMessage'>
            press 'New Post' to add content!
          </div>
        </div>
      )
    }

    if (!this.props.SelectedCategory) {
      return (
        <div className='defaultMessage'>
          Select a category to show content!
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
            onClick={()=> this.props.selectPost(this.props.Posts.perId[id].id)}
            className={'post ' + (this.props.Posts.SelectedIds.includes(id) ? 'selected' : 'unselected') } >
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
    SelectedCategory: state.Categories.SelectedId
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectPost: selectPost}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
