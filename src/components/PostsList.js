import React from 'react'
import PropTypes from 'prop-types'

const myDummyPosts = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  'qqqqqqqqqqqqqqqqqqqq': {
    id: 'qqqqqqqqqqqqqqqqqqqq',
    timestamp: 1467111872111,
    title: 'Another post',
    body: 'This is my body',
    author: 'xiaoju',
    category: 'react',
    voteScore: 1,
    deleted: false
  }
}

const PostsList = (Posts = myDummyPosts, SelectedPost) => (
  <div className='PostsList'>
    List of Posts
    {console.log(this.props)}
    {Object.keys(Posts).map((id) => (
      <div key={id}>
        <div className='title'>{Posts[id].title}</div>
        <div className='author'>{Posts[id].author}</div>
        <div className='timeStamp'>{Posts[id].timestamp}</div>
        {/* if thisPost.id belongs to the SelectedPost array, then mark this post as 'selected' */}
        {/* <Score OfWhat='post' id={id}/>  */}
        {/* <Count ofWhat='comment' id={id}/>  */}
      </div>
    ))}
  </div>
)

PostsList.propTypes = {
  Posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      // body: PropTypes.string.isRequired,
      // category: PropTypes.string.isRequired,
      // deleted:PropTypes.bool.isRequired,
      voteScore: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  SelectedPost: PropTypes.string.isRequired,
  onPostClick: PropTypes.func.isRequired
}

export default PostsList
