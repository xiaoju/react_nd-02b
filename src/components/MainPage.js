import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  sortPosts,
  sortComments,
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts,
  showMore,
} from '../actions/index'
import CategoriesBar from './CategoriesBar'
import SortBar from './SortBar'
import PostsList from './PostsList'
import PostsToolbar from './PostsToolbar'
import PostDetails from './PostDetails'
import CommentsList from './CommentsList'
import NewCommentForm from './NewCommentForm'

class MainPage extends Component {

  componentDidMount(){
    const urlPostId = this.props.match.params.id
    const urlCategory = this.props.match.params.category
    this.props.fetchCategories()
      .then( () => (
        (urlCategory == null) || (urlCategory === '_') ?
          this.props.fetchAllPosts() :
          this.props.fetchCatPosts(urlCategory)
      ))
      .then(()=>(
        urlPostId &&
        this.props.posts.allIds.includes(urlPostId) &&
        // above line to avoid crash of fetchComments when postId is wrong
        this.props.showMore(urlPostId)
      ))
  }

  render() {
    return (
      <div className = 'mainPage'>

{ !this.props.selectedPostId &&

        <div className = 'postsContainer'>

          <CategoriesBar />

          <SortBar
            columns={[
              {field: 'category', label: 'Category'},
              {field: 'author', label: 'Author'},
              {field: 'timestamp', label: 'Time'},
              {field: 'commentsCount', label: 'Comments count'},
              {field: 'voteScore', label: 'Score'},
            ]}
            sortCriteria={this.props.posts.sortCriteria}
            sortDirection={this.props.posts.sortDirection}
            sortThese={this.props.sortPosts}
          />

          <PostsList />

          {/* <PostsToolbar /> */}

        </div>
}
          { this.props.selectedPostId &&
            <div className='detailsContainer'>

              <PostDetails
                thisPost={this.props.posts.perId[this.props.selectedPostId]}
              />

              <SortBar
                className='sortBar'
                columns={[
                  {field: 'author', label: 'Author'},
                  {field: 'timestamp', label: 'Time'},
                  {field: 'voteScore', label: 'Score'},
                ]}
                sortCriteria={this.props.comments.sortCriteria}
                sortDirection={this.props.comments.sortDirection}
                sortThese={this.props.sortComments}
              />

              <CommentsList />

              <NewCommentForm
                postId={this.props.selectedPostId}
              />

            </div>
          }
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedPostId: state.posts.selected,
    posts: state.posts,
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCategories: fetchCategories,
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    sortPosts: sortPosts,
    sortComments: sortComments,
    showMore: showMore,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))

MainPage.propTypes = {
  selectedPostId: PropTypes.string,
  posts: PropTypes.object.isRequired,
  comments: PropTypes.object,

  fetchCategories: PropTypes.func.isRequired,
  fetchCatPosts: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  sortPosts: PropTypes.func.isRequired,
  sortComments: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
}
