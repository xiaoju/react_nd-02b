import {
  POST_FETCH,
  POST_FLUSH
} from '../actions'

// const emptyState = {
//   Posts: {}
// }

const dummyPosts = {
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

const postsReducer = (state = dummyPosts, action) => {
  switch (action.type) {
    case POST_FETCH:
      return dummyPosts

    case POST_FLUSH:
      return {}

    default:
      return state
  }
}

export default postsReducer
