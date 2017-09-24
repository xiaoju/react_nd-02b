import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPost, showPost, fetchAllPosts } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

// TODO
// if post just got added, or app just started,
// then need initialize what are the selected category, and what are the VisibleIds

  componentDidMount() {
        this.props.fetchAllPosts()
  }

  render() {


    // TODO add lifecycle stuff when page mounts: pass URL parameters into state

    // TODO make the postListElement and independant component, with its own 'be red' property,
    // so it can manage itself the color when selected

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

    return (
      <div className='list'>
        {this.props.Posts.VisibleIds.map((id)=>(
          <div
            key={id}
            role='button'
            tabIndex='0'        /* to allow navigation with keyboard, but still BUG not clickable! */
            onClick={()=> this.props.selectPost(this.props.Posts.perId[id].id)}
            // TODO selectPost to be done with checkBox,
            // showPost to be done with onClick
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
    SelectedPath: state.Categories.SelectedPath
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchAllPosts: fetchAllPosts,
    selectPost: selectPost,
    showPost: showPost
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
