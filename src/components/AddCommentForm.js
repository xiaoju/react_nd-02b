import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  newComment,
} from '../actions/index'
import PropTypes from 'prop-types'

class AddCommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  cancel(){
    this.setState({body: '', author: ''})
  }

  render(){
    return (
      <div>
        <form
          className='newCommentForm'>
            <div className='formFields'>
              <textarea
                name="body"
                value={this.state.body}
                onChange={this.handleInputChange} />
              <input
                name="author"
                value={this.state.author}
                onChange={this.handleInputChange} />
            </div>
        </form>
        <div className='commentsToolbar'>

          <button
            className='button'
            onClick={this.cancel}
          >
          Cancel
          </button>

          <button
            className='button'
            onClick={()=>
              this.props.newComment(
                {
                  body: this.state.body,
                  author: this.state.author,
                  parentId: this.props.postId,
                }
              )
              .then(() => this.cancel())
            }
          >
          Submit New Comment
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newComment: newComment,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm)

AddCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  newComment: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
}
