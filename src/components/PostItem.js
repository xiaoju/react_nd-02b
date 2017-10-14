import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  downloadComments,
  showMorePlus,
  showLess,
  votePost,
  deletePost,
  editPost,
 } from '../actions/index'
import { bindActionCreators } from 'redux'
import {
  withRouter,
  Link,
 } from 'react-router-dom'
import VoteButton from './VoteButton'

class PostItem extends Component {

  componentDidMount() {
    this.props.downloadComments(this.props.thisPost.id)
  }

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
            () => this.props.showMorePlus(this.props.thisPost.id)
            .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`) )
          }
          >
            {this.props.thisPost.title}
        </div>
        <div className='infoLabels'>
          <div
            className='passiveLabels'
            // onClick={
            //   this.props.selectedPost === this.props.thisPost.id ?
            //   () => {
            //     this.props.showLess();
            //     this.props.history.push(`/${this.props.selectedCategory}`)
            //   }
            //   :
            //   () => this.props.showMorePlus(this.props.thisPost.id)
            //   .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`) )
            // }
            >
            <div className='category columnContent'>{this.props.thisPost.category}</div>
            <div className='author columnContent'>{this.props.thisPost.author}</div>
            <div className='timestamp columnContent'>{(new Date(this.props.thisPost.timestamp)).toLocaleString()}</div>
            <div className='commentsCount columnContent'>{this.props.commentsCount[this.props.thisPost.id]}</div>
          </div>

          <button
            onClick={() => this.props.showMorePlus(this.props.thisPost.id)
            .then(() => this.props.history.push(`/${this.props.selectedCategory || '_'}/${this.props.thisPost.id}`) )
            }
            className="uglyButton">
            ugly DETAILS
          </button>
          <button
            onClick={() => this.props.deletePost(this.props.thisPost.id)}
            className="uglyButton">
            ugly DEL
          </button>
          <Link to={`/editpost/${this.props.thisPost.id}`} className="uglyButton">ugly EDIT</Link>

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
    selectedCategory: state.categories.selected,
    commentsCount: state.comments.commentsCount,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    downloadComments: downloadComments,
    showLess: showLess,
    showMorePlus: showMorePlus,
    votePost: votePost,
    deletePost: deletePost,
    editPost: editPost,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem))

PostItem.propTypes = {
  thisPost: PropTypes.object.isRequired,

  selectedPost: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  commentsCount: PropTypes.object.isRequired,

  showLess: PropTypes.func.isRequired,
  showMorePlus: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
}
