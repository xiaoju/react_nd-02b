import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class Categories extends Component {

  render() {
    return (
      <div className='.categories'>
        {this.props.Categories.allIds.map((id)=>(
          <div
            key={id}
            onClick={()=> this.props.selectCategory(this.props.Categories.perId[id].id)}
            className={'category ' + (this.props.Categories.SelectedIds.includes(id) ? 'selected' : 'unselected') } >
            <div className='path'>{this.props.Categories.perId[id].path}</div>
            {/* <div className='name'>{this.props.Categories.perId[id].name}</div> */}
          </div>
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
  return bindActionCreators({ selectCategory: selectCategory}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
