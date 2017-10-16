import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  sortComments,
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts,
  showMore,
} from '../actions/index'
import PostDetails from './PostDetails'
import SortBar from './SortBar'
import CommentsList from './CommentsList'
import NewCommentForm from './NewCommentForm'

class DetailsContainer extends Component {

  componentDidMount(){
    const urlPostId = this.props.match.params.id

    this.props.fetchCategories()
      .then(()=>this.props.fetchAllPosts())
      .then(()=>(
        this.props.posts.allIds.includes(urlPostId) &&
        // above line to avoid crash of fetchComments when there is no post with postId as an id.
        this.props.showMore(urlPostId)
      ))
  }

  render() {
    const urlPostId = this.props.match.params.id
    const urlCategory = this.props.match.params.category

    return (
      <div className='detailsContainer'>

        <PostDetails
          postId={urlPostId}
          currentCategory={urlCategory}
        />

        <SortBar
          className='sortBar'
          columns={[
            {field: 'author', label: 'Author'},
            {field: 'timestamp', label: 'Time'},
            {field: 'voteScore', label: 'Score'},
          ]}
          sortCriteria={this.props.sortCriteria}
          sortDirection={this.props.sortDirection}
          sortThese={this.props.sortComments}
        />

        <CommentsList />

        <NewCommentForm
          postId={urlPostId}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    sortCriteria: state.comments.sortCriteria,
    sortDirection: state.comments.sortDirection,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCategories: fetchCategories,
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    sortComments: sortComments,
    showMore: showMore,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsContainer))

DetailsContainer.propTypes = {
  posts: PropTypes.object.isRequired,

  fetchCategories: PropTypes.func.isRequired,
  fetchCatPosts: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  sortComments: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
}
