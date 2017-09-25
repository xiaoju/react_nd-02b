import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectCategory,
  fetchCategories
} from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'

class Categories extends Component {

  render() {
    return (
      <div className='toolbar'>
        <Link     // 'show all categories' button
          to="/"
          onClick={()=> this.props.selectCategory(null)}
          className={
            'button ' +
            (this.props.Categories.SelectedPath === null ? 'selected' : 'unselected') }
          >Show All</Link>

        {this.props.Categories.allPaths.map(path=>(
          <Link   // 'show this category' buttons
            key={path}
            to={`/${path}`}
            onClick={
              ()=> this.props.selectCategory(path)
              // ()=> (this.props.selectCategory(path) && this.props.fetchCatPosts(path))
              // first we populate the view with the data from state, then we call the API,
              // so that if network is down, we still have something to show.
              // BUG anyway these cats are overwritten by fresh all posts from API when updating the main view!
            }
            className={'button ' + (this.props.Categories.SelectedPath === path ? 'selected' : 'unselected') }
            >{path}</Link>
        ))
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Categories: state.Categories
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    selectCategory: selectCategory,
    fetchCategories: fetchCategories
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
