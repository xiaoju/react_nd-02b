import React from 'react'

const PostDetails = props => (
  props.thisPost &&
  <div className='details'>
    <div className='body'>{props.thisPost.body}</div>
  </div>
)

export default PostDetails
