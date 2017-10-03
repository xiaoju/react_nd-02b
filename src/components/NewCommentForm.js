import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteComment, editComment } from '../actions/index'
import {
  withRouter,
} from 'react-router-dom'

class NewCommentForm extends Component {

  constructor(props) {
    super(props)
    this.deleteCommentButton = this.deleteCommentButton.bind(this)
    this.editCommentButton = this.editCommentButton.bind(this)
  }

  deleteCommentButton() {
    return (
      this.props.commentId ?
      <button
        onClick={() => this.props.deleteComment(this.props.postId, this.props.commentId)}
        className="button">
        Delete Comment
      </button>
      :
      <button
        className="button inactive_button">
        Delete Comment
      </button>
    )
  }

  editCommentButton() {
    return (
      this.props.commentId ?
      <button
        onClick={() => this.props.editComment(this.props.postId, this.props.commentId)}
        className="button">
        Edit Comment
      </button>
      :
      <button
        className="button inactive_button">
        Edit Comment
      </button>
    )
  }

  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          className={`formField button w100 ${field.meta.touched && field.meta.error ? 'redBorder' : ''}`}
          type='textarea'
          {...field.input}
        />
        <div className='errorMessage'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log(values)
  }

  render(){
    const { handleSubmit } = this.props

    return (
      <div className='newCommentForm'>
        <br />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>


              <Field
                label='body'
                name='body'
                component={this.renderField}
              />

              <Field
                label='author'
                name='author'
                component={this.renderField}
              />
              <div className='commentsToolbar'>
                {this.deleteCommentButton()}
                {this.editCommentButton()}
                <button type="submit" className='button'>Submit comment</button>
              </div>

        </form>
    </div>
    )
  }

}

function validate(values){
  const errors  = {}
  if (!values.author) {errors.author='Please choose a pseudo!'}
  if (!values.body) {errors.body='Please type your comment!'}
  return errors
}

function mapStateToProps(state) {
  return {
    commentId: state.comments.selected,
    postId: state.posts.selected
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     deleteComment: deleteComment,
     editComment: editComment,
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      validate,
      form: 'newComment',
      // initialValues: {
      //   author: 'xiaoju',
      //   body: 'This is my comment.',
      // }
    }
    )(NewCommentForm)
  )
)
