import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import {
  selectCategory,
  fetchCategories,
  fetchCatPosts,
  fetchAllPosts
} from '../actions/index'

import Categories from './Categories'
// import SearchBar from './SearchBar'
// import FilterToolbar from './FilterToolbar'
// import ListSortbar from './ListSortbar'
import List from './List'
import ListToolbar from './ListToolbar'
// import Details from './Details'
// import CommentsSortbar from './CommentsSortbar'
// import Comments from './Comments'

class MainPage extends Component {

  componentDidMount(){
    // console.log('MainPage.js: componentDidMount')
    // console.log('MainPage.js: fetching categories')
    this.props.fetchCategories()

    // console.log('MainPage.js: fetching posts')
    // this.props.match.params.category == null ? this.props.fetchAllPosts() : this.props.fetchCatPosts()

    this.props.fetchAllPosts()
    this.props.selectCategory(this.props.match.params.category)
  }

  render() {
    // console.log('MainPage.js: rendering')
    return (
      <div className = 'mainPage'>
        <div className = 'filterContainer'>
          {/* <FilterToolbar /> */}
          <Categories />
          {/* <SearchBar /> */}
        </div>
        <div className = 'listContainer'>
          <ListToolbar />
          {/* <ListSortbar /> */}
          <List />
        </div>
        {/* <div className = 'detailsContainer'>
          <Details />
          <CommentsSortbar />
          <Comments />
        </div> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Posts: state.Posts,
    SelectedPath: state.Categories.SelectedPath
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    selectCategory: selectCategory,
    fetchCategories: fetchCategories,
    fetchCatPosts: fetchCatPosts,
    fetchAllPosts: fetchAllPosts,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))
