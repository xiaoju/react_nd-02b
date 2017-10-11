import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  showMore,
  showLess,
  votePost,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import SortBar from './SortBar'
import VoteButton from './VoteButton'

class OnePost extends Component {

  render() {
    return (
      <div>
        <div
          className='title'
          onClick={
            this.props.selectedPost === this.props.thisPost.id ?
            () => {
              this.props.showLess();
              this.props.history.push(`/${this.props.selectedCategory}`)
            }
            :
            () => this.props.showMore(this.props.thisPost.id)
            .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`) )
          }
          >
            {this.props.thisPost.title}
        </div>
        <div className='infoLabels'>
          <div
            className='passiveLabels'
            onClick={
              this.props.selectedPost === this.props.thisPost.id ?
              () => {
                this.props.showLess();
                this.props.history.push(`/${this.props.selectedCategory}`)
              }
              :
              () => this.props.showMore(this.props.thisPost.id)
              .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`) )
            }
            >
            <div className='category columnContent'>{this.props.thisPost.category}</div>
            <div className='author columnContent'>{this.props.thisPost.author}</div>
            <div className='timestamp columnContent'>{(new Date(this.props.thisPost.timestamp)).toLocaleString()}</div>
            <div className='commentsCount columnContent'>{this.props.commentCount[this.props.thisPost.id] || '_'}</div>
          </div>
          <VoteButton
            id={this.props.thisPost.id}
            voteScore={this.props.thisPost.voteScore}
            voteItem={this.props.votePost}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPost: state.posts.selected,
    commentCount: state.posts.commentCount,
    selectedCategory: state.categories.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    showLess: showLess,
    showMore: showMore,
    votePost: votePost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnePost))

SortBar.propTypes = {
  thisPost: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  showLess: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
}
