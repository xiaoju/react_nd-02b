import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewpostForm from './NewpostForm'
import { addPost } from '../actions/index'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class NewpostPage extends Component {

  submit = (values) => {
    this.props.addPost(values)
    this.props.history.push(`/${values.path}/${values.id}`)
    // BUG post doesn't appear in the list after it got created
  }

  render() {
    return (
      <div>
        <NewpostForm onSubmit={this.submit} />
        <Link
          to={`/${this.props.SelectedPath}/`}
          className='button'
          >Cancel
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    SelectedPath: state.Categories.SelectedPath
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     addPost: addPost
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewpostPage)
)
