import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  newComment,
} from '../actions/index'
import PropTypes from 'prop-types'

class NewCommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  cancel(){
    this.setState({body: '', author: ''})
  }

  render(){
    return (
      <div className='newCommentForm'>
        <form
          className='newCommentForm'>
            <div id='zzz'>
              <textarea
                id='aaa'
                className='formFields'
                name="body"
                value={this.state.body}
                onChange={this.handleInputChange}
                placeholder='Type new comment here'
               />
              <input
                id='bbb'
                className='formFields'
                name="author"
                value={this.state.author}
                onChange={this.handleInputChange}
                placeholder='Here your pseudo'
              />
            </div>
        </form>
          <div className='commentsToolbar' id='yyy' >
            {
              this.state.body === '' && this.state.author === '' ?
                  <button
                    id='ccc'
                    className='button inactive_button'
                    >Cancel
                  </button>
              :
                  <button
                    id='ccc'
                    className='button'
                    onClick={this.cancel}
                    >Cancel
                  </button>
            }
            {
              this.state.body === '' || this.state.author === '' ?
                <button
                  id='ddd'
                  className='button inactive_button'
                  >Submit
                </button>
              :
                <button
                  id='ddd'
                  className='button'
                  onClick={()=>
                    this.props.newComment(
                      {
                        body: this.state.body,
                        author: this.state.author,
                        parentId: this.props.postId,
                      }
                    )
                    .then(() => this.cancel())
                  }
                  >Submit
                </button>
            }
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newComment: newComment,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm)

NewCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  newComment: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
}
