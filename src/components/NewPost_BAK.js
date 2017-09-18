import React, { Component } from 'react'
import { addPost } from '../actions/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    var payload = {
      id: Math.random().toString(36).substr(-20),
      timestamp: Date.now(),
      title: this.state.typedTitle,
      body: this.state.typedBody,
      author: this.state.typedAuthor,
      catId: this.state.catId
    }
    // ReadableAPI.postPost(payload)
    // .then((res) => console.log(res))
    // TODO add redirect to the detail page of this post
    // TODO use UUID for id
  }

  handleChange(event){
    // as per https://facebook.github.io/react/docs/forms.html
    const target = event.target
    const name = target.name
    const value = target.value
    // this.setState({[name]: value})
  }

  render() {
    return (

      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name='typedTitle' type='text' value={this.state.typedTitle} onChange={this.handleChange}
            required />
          </label>
          <br />
          <label>
            Category:
            {/* initially, the form comes with selectedCat, which is first the currently active category prefilled.
              As soon as user type selected another category, this the one that show. */}
             <select name='typedCat' value={this.state.typedCat||this.state.selectedCat[0]} onChange={this.handleChange} >
               {this.state.categories.map((item) => (
                   <option key={item.path} value={item.path}>{item.path}</option>
               ))}
             </select>
          </label>
          <br />
          <label>
            Author:
            <input name='typedAuthor' type='text' value={this.state.typedAuthor} onChange={this.handleChange}
            required />
          </label>
          <br />
          <label>
            Body:
            <input name='typedBody' type='text' value={this.state.typedBody} onChange={this.handleChange}
            required />
            {/* //TODO body should be textarea */}
          </label>
          <br />
          <input type='submit' value='Post!' />
        </form>

          {/* <Link to={`/${this.state.typedCat}/${this.state.selectedCat}`}>Cancel</Link> */}
          {/* //TODO what's that?! */}
      </div>



    )
  }
}

function mapStateToProps(state) {
  return {
    Posts: state.Posts
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addPost: addPost}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));
