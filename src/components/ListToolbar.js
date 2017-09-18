import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {selectNonePost, selectAllPost, removePost } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'


class ListToolbar extends Component {
  render() {
    return (
      <div className='listToolbar'>
        <Link to="/newpost" className="linkButton">New Post</Link>

        <button
          onClick={this.props.removePost}
          className="button">
          Delete Selected
        </button>
        <br />

        {/* toggle button 'select all / 'select none' */}
        {/* TODO make this button a reusable component, incl. CSS */}
        { (this.props.SelectedIds.length === this.props.allIds.length) ?
          <button
            onClick={this.props.selectNonePost}
            className="button">
            Select None
          </button> :
          <button
            onClick={this.props.selectAllPost}
            className="button">
            Select All
          </button> }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    SelectedIds: state.Posts.SelectedIds,
    allIds: state.Posts.allIds
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     selectNonePost: selectNonePost,
     selectAllPost: selectAllPost,
     removePost: removePost
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListToolbar));
