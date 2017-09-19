import React from 'react'
import { Field, reduxForm } from 'redux-form'
// https://redux-form.com

let NewpostForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <Field name="body" component="input" type="textarea" />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Field name="author" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <Field name="category" component="input" type="text" />
      </div>

      <div>
        <label htmlFor="id">id</label>
        <Field name="id" component="input" type="text" />
      </div>

      <div>
        <label htmlFor="timestamp">timestamp</label>
        <Field name="timestamp" component="input" type="text" />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

NewpostForm = reduxForm({
  form: 'newPost'
})(NewpostForm)

export default NewpostForm
