import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editComment,
  deleteComment,
} from '../actions/index'
// import PropTypes from 'prop-types';

class EditDeleteCommentForm extends Component {

  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.button1 = this.button1.bind(this)
    this.button2 = this.button2.bind(this)

    this.state = {
      // initial state 'B'
      startedInput: false,
      author: this.props.comments.perId[this.props.selectedComment].author,
      body: this.props.comments.perId[this.props.selectedComment].body,
      button1Class: 'button.inactive',
      button1Label: 'delete',
      button1action: undefined,
      // button1Action: () => this.props.deleteComment(this.props.postId, this.props.commentId),
      // button1Action: function() {this.props.deleteComment(this.props.postId, this.props.commentId)},
      button2Class: 'button.inactive',
      button2Label: 'confirm edit',
      button2Action: undefined,
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      // state Bbis (started input)
      [name]: value,
      startedInput: true,
      button1Class: 'button',
      button1Label: 'cancel edit',
      button1Action: this.props.cancelInput,
      button2Class: 'button',
      button2Label: 'confirm edit',
      button2Action: () => this.props.editComment({
          postId: this.props.postId,
          commentId: this.props.commentId,
          body: this.state.body,
          timestamp: Date.now(),
      }),
    })
  }

  cancelInput(){
    this.setState({
      startedInput: false
    })
  }

  button1() {
    return (
      <button
        className={this.state.button1Class}
        onClick={this.state.button1Action}
      >
      {this.state.button1Label}
      </button>
    )
  }

  button2() {
    return (
      <button
        className={this.state.button2Class}
        onClick={this.state.button2Action}
      >
      {this.state.button2Label}
      </button>
    )
  }

  render(){
    return (
      <div>
        <form
          className='newCommentForm'>
            <div className='formFields'>
              <textarea
                name='body'
                value={this.state.body}
                onChange={this.handleInputChange}
              />
              <input
                name='author'
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </div>
        </form>
            <div className='commentsToolbar'>
              {this.button1()}
              {this.button2()}
            </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    selectedComment: state.comments.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    editComment: editComment,
    deleteComment: deleteComment,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteCommentForm)

// EditDeleteCommentForm.propTypes = {
//   postId: PropTypes.string,
//   commentId: PropTypes.string,
//   author: PropTypes.string,
//   body: PropTypes.string,
//   deleteComment: PropTypes.func.isRequired,
//   editComment: PropTypes.func.isRequired,
// }
