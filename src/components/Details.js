import React from 'react'

const Details = props => (
  props.thisPost &&
    <h4 className='postDetails'>
      <div className='title'>
      {props.thisPost.title}</div>
      <br />
      <div className='author'>
      Author: {props.thisPost.author}</div>
      <br />
      <div className='voteScore'>
      Score: {props.thisPost.voteScore}</div>
      <br />
      <div className='timestamp'>
      Time: {props.thisPost.timestamp}</div>
      <br />
      <div className='category'>
      Category: {props.thisPost.category}</div>
      <br />
      <div className='body'>
      {props.thisPost.body}</div>
    </h4>
)

export default Details
