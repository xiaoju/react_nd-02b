import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {selectNoneCategory, selectAllCategory } from '../actions/index'
import { withRouter, Link } from 'react-router-dom'


class FilterToolbar extends Component {

  constructor(props) {
    super(props)
    this.selectButton = this.selectButton.bind(this)
  }

  selectButton() {
    switch (this.props.allIds.length) {
      case 0:
        return (
        <button
          className="button inactive_button">
          Select All
        </button>)
      case this.props.SelectedIds.length:
        return (
        <button
          onClick={this.props.selectNoneCategory}
          className="button">
          Select None
        </button>)
      default:
        return (
        <button
          onClick={this.props.selectAllCategory}
          className="button">
          Select All
        </button>)
    }
  }

  render() {
    return (
      <div className='FilterToolbar'>
        {this.selectButton()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    SelectedIds: state.Categories.SelectedIds,
    allIds: state.Categories.allIds
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     selectNoneCategory: selectNoneCategory,
     selectAllCategory: selectAllCategory
   },
  dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterToolbar));
