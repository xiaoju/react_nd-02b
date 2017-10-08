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
    this.submit_edit_Button = this.submit_edit_Button.bind(this)
    this.cancel_delete_Button = this.cancel_delete_Button.bind(this)

    this.state = {
      startedInput: false
    }

  }

  cancel_delete_Button() {
    return (
      this.state.startedInput ?
        this.props.commentId ?
          <button
            className='button'
            onClick={() => this.setState({startedInput: false})}
          >
            (D) Cancel
          </button>
        :
          <button
            className='button'
            onClick={() => this.setState({startedInput: false})}
          >
            (B) Cancel new comment
          </button>
      :
        this.props.commentId ?
          <button
            className='button'
            onClick={() => this.props.deleteComment(this.props.postId, this.props.commentId)}
            // this should also set commentId to nothing which triggers re-render
          >
            (C) delete
          </button>
        :
          <button
            className='button inactive_button'
          >
            (A) cancel/delete
          </button>
    )
  }

  submit_edit_Button() {
    return (
      this.state.startedInput ?
        this.props.commentId ?
          <button
            className='button'
            // onClick={}
              // add here API call to update this comment, will trigger re-render and so startedInput comes  back to false}
          >
            (D) Confirm the edit
          </button>
        :
          <button
            className='button'
            onClick={() => this.setState({startedInput: false})}
            // and here should also create the new comment
          >
            (B) Submit new comment
          </button>
      :
        this.props.commentId ?
          <button
            className='button inactive_button'
          >
            (C) Type text to edit
          </button>
        :
          <button
            className='button inactive_button'
          >
            (A) Submit/Edit
          </button>
    )
  }

  // cancel_delete_Button() {
  //   return (
  //     (this.state.showEditForm === 'yes') || !this.props.commentId ?
  //       <button
  //         className="button inactive_button">
  //         Delete Comment
  //       </button>
  //     :
  //       <button
  //         onClick={() => this.props.deleteComment(this.props.postId, this.props.commentId)}
  //         className="button">
  //         Delete Comment
  //       </button>
  //   )
  // }

  // submit_edit_Button() {
  //   return (
  //     this.state.showEditForm === 'yes' ?
  //       <button
  //         onClick={() => this.setState({showEditForm: 'no'})}
  //         className="button">
  //         Cancel
  //       </button>
  //     :
  //       this.props.commentId ?
  //         <button
  //           onClick={() => this.setState({showEditForm: 'yes'})}
  //           className="button">
  //           Edit Comment
  //         </button>
  //       :
  //         <button
  //           className="button inactive_button">
  //           Edit Comment
  //         </button>
  //   )
  // }

  // renderSubmitField(field) {
  //   return (
  //     <button
  //       type={field.type}
  //       className={`button ${field.meta.error ? 'inactive_button' : ''}`}
  //       onClick={field.onClick}
  //       >{field.label}
  //     </button>
  //   )
  // }

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

  onInputChange(values){
    this.setState({startedInput: true})
  }

  render(){
    const { handleSubmit } = this.props
    return (
      <form
        className='newCommentForm'
        onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='formFields'>
            <Field
              name='body'
              type='textarea'
              placeholder='Type new comment here'
              onChange={this.onInputChange.bind(this)}
              component={this.renderField}
            />
            <Field
              name='author'
              type='text'
              placeholder='Type pseudo here'
              onChange={this.onInputChange.bind(this)}
              component={this.renderField}
            />
          </div>
          <div className='commentsToolbar'>
            {this.cancel_delete_Button()}
            {this.submit_edit_Button()}

            {/* <Field
              name='submit'
              type={this.state.showEditForm === 'yes' ? 'submit' : ''}
              component={this.renderSubmitField}
              label='submit'
            />

            <Field
              name='edit'
              type={(this.state.showEditForm === 'no' && this.props.commentId) ? 'submit' : '' }
              component={this.renderSubmitField}
              label={this.state.showEditForm === 'yes' ? 'cancel' : 'edit'}
              onClick={
                this.state.showEditForm === 'yes' ?
                () => this.setState({showEditForm: 'no'}) :
                  this.props.commentId ?
                  () => this.setState({showEditForm: 'yes'}) :
                  ''
              }
            /> */}

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
  if (!values.body || !values.author) {errors.body_or_author='fields not pristine'}
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
