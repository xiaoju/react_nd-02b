import React from 'react'

const Details = (props) => (
  <h3>
    {props.thisPost.title}
    <br />
    {props.thisPost.author}
    <br />
    {props.thisPost.body}
    <br />
    {props.thisPost.voteScore}
    <br />
    {props.thisPost.timestamp}
    <br />
    {props.thisPost.category}
  </h3>
)

export default Details
