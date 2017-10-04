import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllPosts,
  fetchCatPosts
} from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter, Link } from 'react-router-dom'

class Categories extends Component {

  render() {
    return (
      <div>
          <Link
            to="/"
            onClick={() => this.props.fetchAllPosts()}
            className={
              'button ' +
              (this.props.categories.selected === null ? 'selected' : 'unselected') }
            >
            Show All
          </Link>
        {this.props.categories.allPaths.map(path=>(
          <Link
            key={path}
            to={`/${path}`}
            onClick={()=> this.props.fetchCatPosts(path)}
            className={'button ' + (this.props.categories.selected === path ? 'selected' : 'unselected') }
            >
            {path}
          </Link>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchAllPosts: fetchAllPosts,
    fetchCatPosts: fetchCatPosts
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
