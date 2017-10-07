import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  deleteComment,
  editComment,
  newComment,
} from '../actions/index'
import {
  withRouter,
} from 'react-router-dom'

class NewCommentForm extends Component {

  constructor(props) {
    super(props)
    this.deleteCommentButton = this.deleteCommentButton.bind(this)
    this.editCommentButton = this.editCommentButton.bind(this)

    this.state = {
      showEditForm: 'no'
    }

  }

  deleteCommentButton() {
    return (
      (this.state.showEditForm === 'yes') || !this.props.commentId ?
        <button
          className="button inactive_button">
          Delete Comment
        </button>
      :
        <button
          onClick={() => this.props.deleteComment(this.props.postId, this.props.commentId)}
          className="button">
          Delete Comment
        </button>
    )
  }

  editCommentButton() {
    return (
      this.state.showEditForm === 'yes' ?
        <button
          onClick={() => this.setState({showEditForm: 'no'})}
          className="button">
          Cancel
        </button>
      :
        this.props.commentId ?
          <button
            onClick={() => this.setState({showEditForm: 'yes'})}
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

  renderSubmitField(field) {
    return (
      <button
        type={field.type}
        className={`button ${field.meta.error ? 'inactive_button' : ''}`}
        >Submit
      </button>
    )
  }

  renderField(field) {
    return (
      <div className='formItem'>
        <input
          className={
            `formInput button ${field.meta.touched && field.meta.error ?
            'failedValidation' :
            'passedValidation'}`
          }
          type={field.type}
          // placeholder={`${field.meta.touched && field.meta.error ? field.meta.error : ''}`}
          placeholder={field.placeholder}
          // rows={field.rows}
          {...field.input}
        />
        {/* <div className='errorMessage'>
          {field.meta.touched ? field.meta.error : ''}
        </div> */}
      </div>
    )
  }

  onSubmit(values) {
    this.props.newComment({
      ...values,
      parentId: this.props.postId,
    })
  }

  render(){
    const { handleSubmit } = this.props
    return (
      <form
        className='newCommentForm'
        onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='formFields'>
            <Field
              name='author'
              type='text'
              placeholder='Type pseudo here'
              component={this.renderField}
            />
            <Field
              name='body'
              type='textarea'
              placeholder='Type new comment here'
              component={this.renderField}
            />
          </div>
          <div className='commentsToolbar'>
            {this.deleteCommentButton()}
            {this.editCommentButton()}

            <Field
              name='submit'
              type={this.state.showEditForm === 'yes' ? 'submit' : ''}
              component={this.renderSubmitField}

            />

          {/* {this.state.showEditForm === 'yes' ?
          <button className="button inactive_button">Submit</button>
          :
          <button type="submit" className='button'>Submit</button>} */}

          </div>
      </form>
    )
  }
}

function validate(values){
  const errors  = {}
  if (!values.body || !values.author) {errors.submit='Not showing the submit button'}
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
     newComment: newComment,
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
