import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {selectNonePost, selectAllPost, removePost } from '../actions/index'
import SelectAllNoneButton from './SelectAllNoneButton'
import { withRouter, Link } from 'react-router-dom'


class ListToolbar extends Component {

  constructor(props) {
    super(props)
    this.selectButton = this.selectButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
  }

  selectButton() {
    switch (this.props.allIds.length) {
      case 0:
        return (
        <button
          className="button inactive_button">
          Select All
        </button>)
      case this.props.SelectedIds.length:
        return (
        <button
          onClick={this.props.selectNonePost}
          className="button">
          Select None
        </button>)
      default:
        return (
        <button
          onClick={this.props.selectAllPost}
          className="button">
          Select All
        </button>)
    }
  }

  deleteButton() {
    return (
      (this.props.SelectedIds.length === 0) ?
      <button
        className="button inactive_button">
        Delete Selected
      </button> :
      <button
        onClick={this.props.removePost}
        className="button">
        Delete Selected
      </button>
    )
  }

  render() {
    return (
      <div className='listToolbar'>
        <Link to="/newpost" className="newpostButton">New Post</Link>
        {this.deleteButton()}
        {this.selectButton()}
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
