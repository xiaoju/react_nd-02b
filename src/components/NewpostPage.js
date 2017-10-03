import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NewpostForm from './NewpostForm'
import { postPost } from '../actions/index'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class NewpostPage extends Component {

  submit = (values) => {
    this.props.postPost(values)
    this.props.history.push(`/${values.category}/${values.id}`)
    // BUG post doesn't appear in the list after it got created
  }

  render() {
    return (
      <div>
        <NewpostForm
          onSubmit={this.submit}
          allCats={this.props.allCats}
        />

        {this.props.selectedCategory ?
          <Link
            to={`/${this.props.selectedCategory}/`}
            className='button'
            >Cancel
          </Link>
        :
          <Link
            to={`/`}
            className='button'
            >Cancel
          </Link>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedCategory: state.categories.selected,
    allCats: state.categories.allPaths,
    selectedCat: state.categories.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     postPost: postPost
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewpostPage)
)
