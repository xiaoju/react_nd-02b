import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPost } from '../actions/index'
import '../css/App.css'
import { bindActionCreators } from 'redux'

class List extends Component {

  render() {
    return (
      <div className='PostsList'>
        {this.props.Posts.allIds.map((id)=>(
          <div
            key={id}
            onClick={()=> this.props.selectPost(this.props.Posts.perId[id].id)}
            className='postItem' >
            <div className='title'>{this.props.Posts.perId[id].title}</div>
            <div className='author'>{this.props.Posts.perId[id].author}</div>
            <div className='timeStamp'>{this.props.Posts.perId[id].timestamp}</div>
            <div className='voteScore'>{this.props.Posts.perId[id].voteScore}</div>
            <div> Selected: { this.props.Posts.SelectedIds.includes(id) ? 'yes' : 'no'}</div>
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
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectPost: selectPost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
