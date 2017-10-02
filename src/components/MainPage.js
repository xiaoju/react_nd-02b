import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts
} from '../actions/index'

import Categories from './Categories'

// import ListSortbar from './ListSortbar'
import PostsList from './PostsList'
import PostsToolbar from './PostsToolbar'

import Details from './Details'
import CommentsList from './CommentsList'
import CommentsToolbar from './CommentsToolbar'

class MainPage extends Component {

  componentDidMount(){
    this.props.fetchCategories()
      .then( () => (
        this.props.match.params.category == null ?
          this.props.fetchAllPosts() :
          this.props.fetchCatPosts(this.props.match.params.category)
      ))
  }

  render() {
    return (
      <div className = 'mainPage'>

        <div className = 'categories'>
          <Categories />
        </div>

        <div className = 'postsContainer'>
          <PostsToolbar />
          {/* <ListSortbar /> */}
          <PostsList />
        </div>

        { this.props.posts.selected &&
        <div className='detailsContainer'>
          <Details
            thisPost={this.props.posts.perId[this.props.posts.selected]}
          />
          <CommentsToolbar />
          <CommentsList />
        </div>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    selectedCat: state.categories.selected,
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchCategories: fetchCategories,
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
