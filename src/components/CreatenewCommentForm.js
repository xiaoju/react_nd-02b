import React, { Component } from 'react'
import PropTypes from 'prop-types';

class CreatenewCommentForm extends Component {

  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickbutton1 = this.handleClickbutton1.bind(this)
    this.handleClickbutton2 = this.handleClickbutton2.bind(this)

    this.state = {
      // initial state 'A'
      startedInput: false,
      author: 'Your pseudo here',
      body: 'Type your comment here',
      button1Class: 'button.inactive',
      button1Label: 'cancel/delete',
      button1Action: undefined,
      button2Class: 'button.inactive',
      button2Label: 'submit/edit',
      button2Action: undefined,
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      // state Abis (started input)
      [name]: value,
      startedInput: true,
      button1Class: 'button',
      button1Label: 'cancel new comment',
      button1Action: {this.props.cancelInput},
      button2Class: 'button',
      button2Label: 'submit new comment',
      button2Action: {
        () => this.props.newComment({
          author: this.state.author,
          body: this.state.body,
          parentId: this.props.postId})
        },
    })
  }

  cancelInput(){
    this.setState({
      startedInput: false
    })
  }

  button1() {
    return (
      <button
        className={this.state.button1Class}
        onClick={this.state.button1Action}
      >
      {this.state.button1Label}
      </button>
    )
  }

  button2() {
    return (
      <button
        className={this.state.button2Class}
        onClick={this.state.button2Action}
      >
      {this.state.button2Label}
      </button>
    )
  }

  render(){
    return (
      <div>
        <form
          className='newCommentForm'>
            <div className='formFields'>
              <textarea
                name='body'
                value={this.state.body}
                onChange={this.handleInputChange}
              />
              <input
                name='author'
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </div>
        </form>
            <div className='commentsToolbar'>
              {this.button1()}
              {this.button2()}
            </div>
      </div>
    )
  }
}

export default CreatenewCommentForm

EachShelf.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
  newComment: PropTypes.func.isRequired,
}
