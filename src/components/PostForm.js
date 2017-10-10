import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
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

  constructor(props) {
    super(props)
    this.renderCategoryField = this.renderCategoryField.bind(this)
  }

  componentDidMount(){
    // this to avoid bug if user open app directly on /newPostForm
    // without this code, there would be no category choice to show inside postForm
    if (this.props.allCats.length === 0) { this.props.fetchCategories() }
  }

  renderCategoryField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <br />
        <select value={this.props.selectedCategory === '' ? undefined : this.props.selectedCategory}>
          {field.allCats.map((thisCategory)=>(
            <option key={thisCategory} value={thisCategory}>{thisCategory}</option>
          ))}
        </select>
        <br /><br />
      </div>
// BUG category value doesn't connect to redux-form
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
      .then(resultPost => this.props.history.push(`/${resultPost.category}/${resultPost.id}`) )
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
