import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { postPost } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withRouter,
  Link,
} from 'react-router-dom'

class PostForm extends Component {

  constructor(props) {
    super(props)
    // this.postPost = this.postPost.bind(this)
  }

  renderCategoryField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <br />
        <select value={field.myInitialValue}>
          {field.allCats.map((thisCategory)=>(
            <option value={thisCategory}>{thisCategory}</option>
          ))}
        </select>
        <br /><br />
      </div>

    )
  }

  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          className={`formField button w100 ${field.meta.touched && field.meta.error ? 'redBorder' : ''}`}
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
    this.props.history.push(`/${values.category}/${values.id}`)
    // BUG post doesn't appear in the list after it got created
  }

  render(){
    const { handleSubmit } = this.props

    return (
      <div className='newPostForm'>
        <br />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

              <Field
                label='Title'
                name='title'
                type= 'text'
                component={this.renderField}
              />

              <Field
                label='Category'
                name='category'
                component={this.renderCategoryField}
                allCats={this.props.allCats}
                myInitialValue={this.props.selectedCategory}
              />

              <Field
                label='Body'
                name='body'
                type= 'textarea'
                component={this.renderField}
              />

              <Field
                label='Author'
                name='author'
                type= 'text'
                component={this.renderField}
              />

              <div className='postsToolbar'>
                <button type="submit" className='button'>Submit</button>
              </div>

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
     postPost: postPost
   },
  dispatch)
}

// TODO use state.categories.selected as initial value for category field
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      validate,
      form: 'newPostForm',
      // initialValues: {
      //   category: 'udacity',
      // }
    }
  )(PostForm)
  )
)
