import React from 'react'
import { Field, reduxForm } from 'redux-form'
// https://redux-form.com

let NewpostForm = props => {
  const { handleSubmit } = props
  return (
    <form
      onSubmit={ handleSubmit }>
      <br />
      <div>
        <label htmlFor="title" className='formLabel' >Title</label>
        <br />
        <Field name="title" component="textarea" rows="2" cols="60"type="text" className='formField'/>
      </div>
      <br />
      <div>
        <label htmlFor="body" className='formLabel'>Body</label>
        <br />
        <Field name="body" component="textarea" type="text" className='formField' rows="10" cols="60"/>
      </div>
      <br />
      <div>
        <label htmlFor="author" className='formLabel'>Author</label>
        <br />
        <Field name="author" component="input" type="text" className='formField'/>
      </div>
      <br />
      <div>
        <label htmlFor="category" className='formLabel'>Category</label>
        <br />
        {/* TODO connect this form to state to get correct categories and ids
          give a non-empty category as pre-filled field,
          category list shouldn't require an update to show udpated list*/}
        <Field name="path" component="select" className='formLabel'>
          <option />
          <option value='react'>React</option>
          <option value='redux'>Redux</option>
          <option value='udacity'>Udacity</option>
        </Field>
      </div>
      <br />
      <div>
        <label htmlFor="id" className='formLabel'>id</label>
        <br />
        <Field name="id" component="input" type="text" className='formField'/>
      </div>
      <br />
      <div>
        <label htmlFor="timestamp" className='formLabel'>timestamp</label>
        <br />
        <Field name="timestamp" component="input" type="text" className='formField'/>
      </div>
      <br />
      <br />
      <button type="submit" className='button'>Submit</button>
    </form>
  )
}

NewpostForm = reduxForm({
  form: 'newPost'
})(NewpostForm)

export default NewpostForm
