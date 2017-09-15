import React, { Component } from "react"
import { connect } from "react-redux"
import '../css/App.css'

class List extends Component {

  render() {
    return (
      <div className='PostsList'>
        {Object.keys(this.props.Posts).map((id)=>(
          <div key={id} className='postItem'>
            <div className='title'>{this.props.Posts[id].title}</div>
            <div className='author'>{this.props.Posts[id].author}</div>
            <div className='timeStamp'>{this.props.Posts[id].timestamp}</div>
            <div className='voteScore'>{this.props.Posts[id].voteScore}</div>
          </div>
        ))}
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
