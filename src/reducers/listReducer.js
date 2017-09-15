import {
  POST_FETCH,
  POST_FLUSH,
  SELECT_POST,
  SELECT_NONE_POST,
  SELECT_ALL_POST
} from '../actions'

// const emptyState = {
//   Posts: {}
// }

const dummyPosts = {
  'perId': {
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
    '6ni6ok3aaaaaaaa3lnez': {
      id: '6ni6ok3aaaaaaaa3lnez',
      timestamp: 1468471167190,
      title: 'ddddddddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    '6nvvvvvvvvvvaaaaa3lnez': {
      id: '6nvvvvvvvvvvaaaaa3lnez',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
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
  },
  'allIds': [
    '8xf0y6ziyjabvozdd253nd',
    '6ni6ok3ym7mf1p33lnez',
    'qqqqqqqqqqqqqqqqqqqq',
    '6ni6ok3aaaaaaaa3lnez',
    '6nvvvvvvvvvvaaaaa3lnez'
  ],
  'SelectedIds': []
}

const listReducer = (state = dummyPosts, action) => {
  switch (action.type) {
    case POST_FETCH:
      return dummyPosts

    case POST_FLUSH:
      return {}

    case SELECT_POST:
      // a toggle function: if postId belongs to array, then remove it, otherwise adds it.
      // console.log(state)
      if (state.SelectedIds.includes(action.postId)) {
        return {
          ...state,
          SelectedIds: state.SelectedIds.filter((id)=>(id !== action.postId))
        }
      } else {
        return {
          ...state,
          SelectedIds: state.SelectedIds.concat(action.postId)
        }
      }

    case SELECT_NONE_POST:
      return {
        ...state,
        SelectedIds: []
      }

    case SELECT_ALL_POST:
      return {
        ...state,
        SelectedIds: state.allIds
      }

    default:
      return state
  }
}

export default listReducer
