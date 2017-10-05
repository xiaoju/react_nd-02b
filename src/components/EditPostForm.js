import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  editPost,
 } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  withRouter,
  Link,
} from 'react-router-dom'

class EditPostForm extends Component {

  constructor(props) {
    super(props)
  }

  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          className={`formField button ${field.meta.touched && field.meta.error ? 'redBorder' : ''}`}
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
            label='Body'
            name='body'
            type= 'textarea'
            component={this.renderField}
          />

          <div className='postsToolbar'>
            <button type="submit" className='button'>Submit</button>
          </div>

          <Link to='/' className='button' >Cancel</Link>

          {/* <button
            className='button'
            onClick={this.props.history.goback}>
            Cancel
          </button> */}
          {/* why this not working? */}

        </form>
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
    selectedCategory: state.categories.selected,
    allCats: state.categories.allPaths,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
     editPost: editPost,
   },
  dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      validate,
      form: 'editPostForm',
      initialValues: {
        title: 'xxx',
        body: 'xxx',
      }
    }
  )(EditPostForm)
  )
)
