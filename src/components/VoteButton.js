import React, { Component } from 'react'

class VoteButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='voteScore voteContainer'>
        <button
          className='voteButton voteElement'
          onClick={() => this.props.voteItem(this.props.id, 'upVote')}
          >
          +
        </button>

        <div className='voteElement'>{this.props.voteScore}</div>

        <button
          className='voteButton voteElement'
          onClick={() => this.props.voteItem(this.props.id, 'downVote')}
          >
          -
        </button>

      </div>
    )
  }
}
export default VoteButton
