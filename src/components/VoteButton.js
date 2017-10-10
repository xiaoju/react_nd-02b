import React, { Component } from 'react'

class VoteButton extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div className='voteMachine'
        >
        <button
          className='voteButton votePlus'
          onClick={() => this.props.voteItem(this.props.id, 'upVote')}
          >
          +
        </button>

        <div className='voteDigit'>{this.props.voteScore}</div>

        <button
          className='voteButton voteMinus'
          onClick={() => this.props.voteItem(this.props.id, 'downVote')}
          >
          -
        </button>

      </div>
    )
  }
}
export default VoteButton
