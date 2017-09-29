import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchComments,
 } from '../actions/index'
import { bindActionCreators } from 'redux'

class DetailsContainer extends Component {

  componentDidMount(){
    this.props.fetchComments(this.props.thisPost)
  }

  render() {
    return (
      <div className = 'detailsContainer'>
        <Details thisPost={this.props.thisPost} />
        
        {/* { this.props.SelectedIds[0] &&
          <Details
            thisPost={this.props.Posts.perId[this.props.SelectedIds[0]]}
          />
        } */}

      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     SelectedIds: state.Posts.SelectedIds,
//     Posts: state.Posts,
//   }
// }

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchComments: fetchComments,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(DetailsContainer)
