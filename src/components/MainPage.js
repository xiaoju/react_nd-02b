import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  sortPosts,
  sortComments,
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts,
  newComment,
} from '../actions/index'
import Categories from './Categories'
import SortBar from './SortBar'
import PostsList from './PostsList'
import PostsToolbar from './PostsToolbar'
import Details from './Details'
import CommentsList from './CommentsList'
import CommentsToolbar from './CommentsToolbar'
import NewCommentForm from './NewCommentForm'

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
        <div className = 'postsContainer'>

          <Categories />

          <SortBar
            columns={[
              {field: 'category', label: 'Category'},
              {field: 'author', label: 'Author'},
              {field: 'timestamp', label: 'Time'},
              {field: 'commentsCount', label: 'Comments'},
              {field: 'voteScore', label: 'Score'},
            ]}
            sortCriteria={this.props.posts.sortCriteria}
            sortDirection={this.props.posts.sortDirection}
            sortThese={this.props.sortPosts}
          />

          <PostsList />

          <PostsToolbar />

        </div>

          { this.props.posts.selected &&
          <div className='detailsContainer'>

            <Details
              thisPost={this.props.posts.perId[this.props.posts.selected]}
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
              onSubmit={this.props.newComment}/>

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
    newComment: newComment,
    sortPosts: sortPosts,
    sortComments: sortComments,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
