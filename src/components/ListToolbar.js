import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNonePost, selectAllPost, removePost } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'


class ListToolbar extends Component {

  constructor(props) {
    super(props)
    this.selectButton = this.selectButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
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

  selectButton() {
    switch (this.props.VisibleIds.length) {
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

  render() {
    return (
      <div className='toolbar'>
        <Link to="/newpost" className="button">New Post</Link>
        {this.deleteButton()}
        {this.selectButton()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    SelectedIds: state.Posts.SelectedIds,
    VisibleIds: state.Posts.VisibleIds
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
