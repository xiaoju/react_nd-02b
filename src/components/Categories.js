import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchCategories, showAllCategories } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class Categories extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className='.categories'>
        <button
          onClick={()=> this.props.showAllCategories()}
          className={'button category ' + (this.props.Categories.SelectedPath === null ? 'selected' : 'unselected') } >
          Show All
        </button>
        {this.props.Categories.allPaths.map((path)=>(
          <button
            key={path}
            onClick={()=> this.props.selectCategory(this.props.Categories.perPath[path].path)}
            className={'button category ' + (this.props.Categories.SelectedPath === path ? 'selected' : 'unselected') } >
            <div className='path'>{this.props.Categories.perPath[path].path}</div>
            {/* <div className='name'>{this.props.Categories.perPath[path].name}</div> */}
          </button>
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
    fetchCategories: fetchCategories,
    showAllCategories: showAllCategories
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
