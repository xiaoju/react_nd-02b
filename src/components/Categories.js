import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  // selectCategory,
  fetchAllPosts,
  fetchCatPosts
} from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'

class Categories extends Component {

  render() {
    return (
      <div className='toolbar'>
        <Link     // 'show all categories' button
          to="/"
          onClick={
            ()=> {
              // this.props.selectCategory(null);
              this.props.fetchAllPosts();
            }
          }
          className={
            'button ' +
            (this.props.Categories.SelectedPath === null ? 'selected' : 'unselected') }
          >Show All</Link>

        {this.props.Categories.allPaths.map(path=>(
          <Link   // 'show this category' buttons
            key={path}
            to={`/${path}`}
            onClick={
              ()=> {
                // this.props.selectCategory(path);
                this.props.fetchCatPosts(path);
              }
            }
            className={'button ' + (this.props.Categories.SelectedPath === path ? 'selected' : 'unselected') }
            >
              {path}
          </Link>
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
    // selectCategory: selectCategory,
    fetchAllPosts: fetchAllPosts,
    fetchCatPosts: fetchCatPosts
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
