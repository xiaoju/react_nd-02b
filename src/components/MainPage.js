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
// import SearchBar from './SearchBar'
// import FilterToolbar from './FilterToolbar'
// import ListSortbar from './ListSortbar'
import List from './List'
import ListToolbar from './ListToolbar'
import DetailsContainer from './DetailsContainer'

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
        <DetailsContainer className='detailsContainer'
          thisPost={this.props.Posts.perId[this.props.SelectedIds[0]] || null}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    SelectedIds: state.Posts.SelectedIds,
    Posts: state.Posts,
    SelectedPath: state.Categories.SelectedPath
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
