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
// import DetailsContainer from './DetailsContainer'
import Details from './Details'
import Comments from './Comments'

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
        {/* <DetailsContainer className='detailsContainer'
          thisPost={this.props.posts.perId[this.props.toDelete[0]] || null} */}

          <div>
            <Details
              thisPost={this.props.posts.perId[this.props.posts.onFocus] || null}
            />
            {/* <Comments
              perId={this.props.comments.perId}
              allIds={this.props.comments.allIds}
            /> */}
          </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // toDelete: state.posts.toDelete,
    posts: state.posts,
    selectedCat: state.categories.selected,
    // comments: state.comments,
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
