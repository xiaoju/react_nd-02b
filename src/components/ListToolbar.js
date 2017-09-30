import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectNoneForDeletion, selectAllForDeletion, deletePost } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'


class ListToolbar extends Component {

  constructor(props) {
    super(props)
    this.toggleButton = this.toggleButton.bind(this)
    this.deleteButton = this.deleteButton.bind(this)
  }

  deleteButton() {
    return (
      (this.props.toDelete.length === 0) ?
      <button
        className="button inactive_button">
        Delete Selected
      </button> :
      <button
        onClick={() => this.props.deletePost(this.props.toDelete)}
        className="button">
        Delete Selected
      </button>
    )
  }

  toggleButton() {
    switch (this.props.visible.length) {
      case 0:
        return (
        <button
          className="button inactive_button">
          Select All
        </button>)
      case this.props.toDelete.length:
        return (
        <button
          onClick={this.props.selectNoneForDeletion}
          className="button">
          Select None
        </button>)
      default:
        return (
        <button
          onClick={this.props.selectAllForDeletion}
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
        {this.toggleButton()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    toDelete: state.posts.toDelete,
    visible: state.posts.visible
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     selectNoneForDeletion: selectNoneForDeletion,
     selectAllForDeletion: selectAllForDeletion,
     deletePost: deletePost
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListToolbar));
