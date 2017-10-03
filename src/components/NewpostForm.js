import React from 'react'
import { Field, reduxForm } from 'redux-form'

let NewpostForm = props => {
  const { handleSubmit } = props
  return (
    <div className='newPostForm'>
      <form
        onSubmit={ handleSubmit }>
        <br />
        <div>
          <label htmlFor="title" className='formLabel' >Title</label>
          <br />
          <Field name="title" component="textarea" rows="2" cols="60" type="text" className='formField'/>
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
          <Field name="category" component="select" className='formLabel'>
            {props.allCats.map((thisCategory)=>(
              <option value={thisCategory}>{thisCategory}</option>
            ))}
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
    </div>
  )
}

NewpostForm = reduxForm({
  form: 'newPost',
  // initialValues: {
  //   category: props.selectedCat,
  // },
})(NewpostForm)

export default NewpostForm
