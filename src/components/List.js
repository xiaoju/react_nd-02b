import React, { Component } from "react"
import { connect } from "react-redux"
import '../css/App.css'

class List extends Component {

  render() {
    return (
      <div className='PostsList'>
        {this.props.Posts.allIds.map((id)=>(
          <div key={id} className='postItem'>
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
  };
}

export default connect(mapStateToProps)(List);
