import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {
//   fetchComments,
//  } from '../actions/index'
// import { bindActionCreators } from 'redux'
import Details from './Details'
import Comments from './Comments'

class DetailsContainer extends Component {

  // componentDidUpdate(){
  //   this.props.thisPost &&
  //     this.props.fetchComments(this.props.thisPost.id)
  // }
  // maybe move this to a onclick property on the postsList, same as fetchPosts on the category toolbar...?

  render() {
    return (
      <div>
        <Details
          thisPost={this.props.thisPost}
        />
        <Comments
          perId={this.props.perId}
          allIds={this.props.allIds}
        />
      </div>
    )
  }
}

export default DetailsContainer

// component updates, fetchcomments, mapStateToProps sends the updated props to the component, updates again = infinite loop

// function mapStateToProps(state, ownProps) {
//   return {
//     perId: state.comments.perId,
//     allIds: state.comments.allIds,
//     thisPost: ownProps.thisPost
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({
//     fetchComments: fetchComments,
//   }, dispatch)
// }
//
// export default connect(null, mapDispatchToProps)(DetailsContainer)
