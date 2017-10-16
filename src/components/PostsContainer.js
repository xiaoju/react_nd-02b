import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  sortPosts,
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts,
} from '../actions/index'
import CategoriesBar from './CategoriesBar'
import SortBar from './SortBar'
import PostsList from './PostsList'
import PostsToolbar from './PostsToolbar'

class PostsContainer extends Component {

  componentDidMount(){
    const urlCategory = this.props.match.params.category

    this.props.fetchCategories()
      .then( () => (
        (urlCategory == null) || (urlCategory === '_') ?
          this.props.fetchAllPosts() :
          this.props.fetchCatPosts(urlCategory)
      ))
  }

  render() {
    return (
      <div className = 'postsContainer'>

        <CategoriesBar />

        <PostsToolbar />

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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCategories: fetchCategories,
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
    sortPosts: sortPosts,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsContainer))

PostsContainer.propTypes = {
  posts: PropTypes.object.isRequired,

  fetchCategories: PropTypes.func.isRequired,
  fetchCatPosts: PropTypes.func.isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  sortPosts: PropTypes.func.isRequired,
}
