import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Field,
  reduxForm,
} from 'redux-form'
import {
  postPost,
  fetchCategories,
 } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withRouter,
  Link,
} from 'react-router-dom'

class PostForm extends Component {

  componentDidMount(){
    // this to avoid bug if user open app directly on /newPostForm
    // without this code, there would be no category choice to show inside postForm
    if (this.props.allCats.length === 0) { this.props.fetchCategories() }

    const initData = {
      'category': this.props.selectedCategory === '' ?
      this.props.allCats[0] :
      this.props.selectedCategory,
    }
    this.props.initialize(initData);
  }

  renderField(field) {
    return (
      <div className='postFormField'>
        <label>{field.label}<br /></label>
        <input
          className={
            `formField button ${field.meta.touched && field.meta.error ?
              'failedValidation' :
              'passedValidation'}`
          }
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

  onSubmit = (values) => {
    this.props.postPost(values)
      .then(resultPost => this.props.history.push(
        `/${this.props.selectedCategory === '' ? '_' : this.props.selectedCategory}/${resultPost.id}`
      ))
  }

  render(){
    const { handleSubmit } = this.props

    return (
      <div className='newPostForm'>
        <h2>New post</h2>
        <br />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <Field
            label='Title'
            name='title'
            type= 'text'
            component={this.renderField}
          />

          <div>
            <label>Category<br /></label>
              <Field
                name='category'
                component='select'
                className='formField button'>
                {this.props.allCats.map((thisCategory)=>(
                  <option key={thisCategory} value={thisCategory}>{thisCategory}</option>
                ))}
              </Field>
            </div>
            <br />

          <Field
            label='Body'
            name='body'
            type= 'textarea'
            component={this.renderField}
          />

          {/*
            BUG: how to have multiline texarea?!
          */}

          <Field
            label='Author'
            name='author'
            type= 'text'
            component={this.renderField}
          />

          <div className='postsToolbar'>
            <button type="submit" className='button'>Submit</button>

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
        </form>
    </div>
    )
  }
}

function validate(values){
  const errors  = {}
  if (!values.title) {errors.title='A title is required!'}
  if (!values.author) {errors.author='Please choose a pseudo!'}
  if (!values.body) {errors.body='Please type your post!'}
  return errors
}

function mapStateToProps(state) {
  return {
    selectedCategory: state.categories.selected,
    allCats: state.categories.allPaths,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     postPost: postPost,
     fetchCategories: fetchCategories,
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      validate,
      form: 'newPostForm',
    }
  )(PostForm)
  )
)

PostForm.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  allCats: PropTypes.array.isRequired,

  postPost: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
}
