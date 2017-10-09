import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editComment,
  hideEditCommentForm,
} from '../actions/index'
import PropTypes from 'prop-types'

class EditDeleteCommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      body: this.props.body,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({body: event.target.value});
  }

  render(){
    return (
      <div>
        <form
          className='newCommentForm'>
            <div className='formFields'>
              <textarea
                value={this.state.body}
                onChange={this.handleInputChange}
              />
            </div>
        </form>

        <div className='timestamp'>{(new Date(this.props.timestamp)).toLocaleString()}</div>
        <div className='author'>{this.props.author}</div>

        <div className='commentsToolbar'>

          <button
            className='button'
            onClick={this.props.hideEditCommentForm}
          >
          cancel
          </button>

          <button
            className='button'
            onClick={()=>editComment(
              this.props.postId,
              this.props.commentId,
              {
                timestamp: Date.now(),
                body: this.state.body,
              }
            )}
          >
          submit
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
    editComment: editComment,
    hideEditCommentForm: hideEditCommentForm,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteCommentForm)

EditDeleteCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}
