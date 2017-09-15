import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {selectNonePost, selectAllPost } from '../actions/index'

class ListToolbar extends Component {
  render() {
    return (
      <div className='ListToolbar'>
        <div>New Post</div>
        <br />
        <div>Delete Selected Post(s)</div>
        <br />
        {/* { (this.props.SelectedIds.length === this.props.allIds.length) ? console.log('same') : console.log('different') } */}
        { (this.props.SelectedIds.length === this.props.allIds.length) ?
          <button
            onClick={this.props.selectNonePost}
            className="toggleAllButton">
            Select None
          </button> :
          <button
            onClick={this.props.selectAllPost}
            className="toggleAllButton">
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
     selectAllPost: selectAllPost
   },
  dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListToolbar);
