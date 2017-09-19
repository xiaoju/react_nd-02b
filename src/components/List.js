import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPost } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class List extends Component {

  render() {
    return (
      <div className='.list'>
        {this.props.Posts.allIds.map((id)=>(
          <div
            key={id}
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
    Posts: state.Posts
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectPost: selectPost}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
