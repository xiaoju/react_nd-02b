import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  editPost,
  fetchCategories,
  fetchAllPosts,
 } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withRouter,
} from 'react-router-dom'
import Page404 from './Page404'

class EditPostForm extends Component {

  componentDidMount(){
    !this.props.postsPerId[this.props.match.params.id] ?
      this.props.fetchCategories()
        .then(()=>this.props.fetchAllPosts())
        .then(()=>this.handleInitialize())
    :
      this.handleInitialize()
  }

  handleInitialize() {
    const postId = this.props.match.params.id
    const initialData = {
      'title': this.props.postsPerId[postId].title,
      'body': this.props.postsPerId[postId].body,
    }
    this.props.initialize(initialData);
  }

  renderField(field) {
    return (
      <div className='postFormField'>
        <label>{field.label}</label>
        <br />
        <input
          className={`formField button ${field.meta.touched && field.meta.error ? 'failedValidation' : 'passedValidation'}`}
          type={field.type}
          {...field.input}
        />
        <div className='errorMessage'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
        <br />
      </div>
    )
  }

  onSubmit = (payload) => {
    this.props.editPost(this.props.match.params.id, payload)
      .then(resultPost => this.props.history.push(`/${resultPost.category}/${resultPost.id}`) )
  }

  render(){
    const { handleSubmit } = this.props

    const urlPostId = this.props.match.params.id
    if (!this.props.visible.includes(urlPostId))
      {return <Page404 urlPostId={urlPostId} urlCategory='' />}

    return (
      <div className='newPostForm'>
        <h2>Edit post</h2>
        <br />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <Field
            label='Title'
            name='title'
            type= 'text'
            component={this.renderField}
          />

          <Field
            label='Body'
            name='body'
            type= 'textarea'
            component={this.renderField}
          />

          <div className='postsToolbar'>
            <button
              type="submit"
              className='button'
              >
              Submit
            </button>

          </div>
        </form>

        <button
          className='button'
          onClick={this.props.history.goBack}
          // TODO how to 'preventDefault' so I can put this button back inside <form> tags?
          // goBack to '/' or '/category' or '/category/id' depending where from
          >
          Cancel
        </button>

    </div>
    )
  }

}

function validate(values){
  const errors  = {}
  if (!values.title) {errors.title='A title is required!'}
  if (!values.body) {errors.body='Post body is required!'}
  return errors
}

function mapStateToProps(state) {
  return {
    selectedCategory: state.categories.selected || '_',
    allCats: state.categories.allPaths,
    postsPerId: state.posts.perId,
    visible: state.posts.visible,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     editPost: editPost,
     fetchAllPosts: fetchAllPosts,
     fetchCategories: fetchCategories,
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      validate,
      form: 'editPostForm',
    }
  )(EditPostForm)
  )
)
