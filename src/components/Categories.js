import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchCategory } from '../actions/index'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

// TODO refactor UI using http://www.material-ui.com
// and http://flexboxgrid.com

class Categories extends Component {

  componentDidMount() {
    this.props.fetchCategory()
  }

  render() {
    return (
      <div className='categories'>
        {this.props.Categories.allIds.map((id)=>(
          <button
            key={id}
            onClick={()=> this.props.selectCategory(this.props.Categories.perId[id])}
            className={'button category ' + (this.props.Categories.SelectedId === id ? 'selected' : 'unselected') } >
            <div className='path'>{this.props.Categories.perId[id].path}</div>
            {/* <div className='name'>{this.props.Categories.perId[id].name}</div> */}
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
    fetchCategory: fetchCategory
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories))
