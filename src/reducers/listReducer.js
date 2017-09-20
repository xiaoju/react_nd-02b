import {
  FETCH_POST,
  REMOVE_POST,
  ADD_POST,

  SELECT_POST,
  SELECT_ALL_POST,
  SELECT_NONE_POST,

  SELECT_CATEGORY
} from '../actions'

const dummyPosts = {
  'allIds': [
    '8xf0y6ziyjabvozdd253nd',
    '6ni6ok3ym7mf1p33lnez',
    'qqqqqqqqqqqqqqqqqqqq',
    '6ni6ok3aaaaaaaa3lnez',
    '6nvvvvvvvvvvaaaaa3lnez',
    'aaa',
    'bbb',
    'ccc',
    'ddd',
    'eee',
    'fff'
  ],
  'SelectedIds': [],
  'VisibleIds': [
    '8xf0y6ziyjabvozdd253nd',
    '6ni6ok3ym7mf1p33lnez'
  ],
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
    },
    'aaa': {
      id: 'aaa',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    'bbb': {
      id: 'bbb',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    'ccc': {
      id: 'ccc',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    'ddd': {
      id: 'ddd',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    'eee': {
      id: 'eee',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    },
    'fff': {
      id: 'fff',
      timestamp: 1400471167190,
      title: 'gggddd',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thfsdone',
      category: 'redux',
      voteScore: -5,
      deleted: false
    }
  }
}

const emptyPosts = {
  'perId' : {},
  'allIds' : {},
  'SelectedIds': [],
  'VisibleIds': []
}

// immutable operations on arrays: https://vincent.billey.me/pure-javascript-immutable-array/

const listReducer = (state = dummyPosts, action) => {
  switch (action.type) {
    case FETCH_POST:
      return dummyPosts

    case REMOVE_POST:
      // for allIds, remove from allIds array any id that belongs to SelectedIds.
      // same for VisibleIds.
      // same for perId, but more convoluted because perId is an object, not an array:
      // the reduce function rebuilds the perId object from empty object {} by adding any sub-object
      // that meets same criteria as for allIds.
      const allIdsNew = state.allIds.filter(id => !state.SelectedIds.includes(id))
      return {
        VisibleIds: state.VisibleIds.filter(id => !state.SelectedIds.includes(id)),
        allIds: allIdsNew,
        perId: allIdsNew.reduce((result, id) => {result[id] = state.perId[id];return result}, {}),
        SelectedIds: [null]
      }

    case ADD_POST:
      const {id, timestamp, title, body, author, category } = action
      return {
        ...state,
        allIds: [id].concat(state.allIds),
        // new id added at begin of array.
        // Other ways: state.allIds.concat(id)   [].concat(state.allIds, id)   [id].concat(state.allIds)
        SelectedIds: [id],
        perId: {
          ...state.perId,
          [id]: {
            id,
            timestamp,
            title,
            body,
            author,
            category
          }
        }
      }

    case SELECT_POST:
      // a toggle function: if postId belongs to array, then remove it, otherwise adds it.
      // console.log(state)
      if (state.SelectedIds.includes(action.id)) {
        return {
          ...state,
          SelectedIds: state.SelectedIds.filter((id)=>(id !== action.id))
        }
      } else {
        return {
          ...state,
          SelectedIds: state.SelectedIds.concat(action.id)
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
        SelectedIds: state.VisibleIds
      }

    case SELECT_CATEGORY:
      return {
        ...state,
        SelectedIds: [],
        VisibleIds: state.allIds.filter((id)=>(state.perId[id].category === action.thisCategory.name))
      }

    default:
      return state
  }
}

export default listReducer
