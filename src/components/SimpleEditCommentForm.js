import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  editComment,
  hideEditCommentForm,
  showMore,
} from '../actions/index'
import PropTypes from 'prop-types'

class SimpleEditCommentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      body: this.props.body,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({body: event.target.value});
  }

  render(){
    return (
      <div>
        <form
          className='newCommentForm'>
            <div className='formFields'>
              <textarea
                value={this.state.body}
                onChange={this.handleInputChange}
              />
            </div>
        </form>

        <div className='timestamp'>{(new Date(this.props.timestamp)).toLocaleString()}</div>
        <div className='author'>{this.props.author}</div>

        <div className='commentsToolbar'>

          <button
            className='button'
            onClick={this.props.hideEditCommentForm}
          >
          cancel
          </button>

          <button
            className='button'
            onClick={()=>
                this.props.editComment(
                  // this.props.postId,
                  this.props.commentId,
                  this.state.body
                )
                .then(()=>this.props.hideEditCommentForm())
                .then(()=>(this.props.showMore(this.props.postId)))
            }
          >
          submit
          </button>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    selectedCategory: state.categories.selected,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    editComment: editComment,
    hideEditCommentForm: hideEditCommentForm,
    showMore: showMore,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleEditCommentForm)

SimpleEditCommentForm.propTypes = {
  comments: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  selectedCategory: PropTypes.string,
  editComment: PropTypes.func.isRequired,
  hideEditCommentForm: PropTypes.func.isRequired,
  showMore: PropTypes.func.isRequired,
}
