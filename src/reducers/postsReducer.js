import {
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  SINGLE_POST_IN,
  REMOVE_POST,
  COUNT_COMMENTS_LOAD_DETAILS,
  SHOW_MORE,
  SHOW_LESS,
  SELECT_CATEGORY,
  SORT_POSTS,
  UPDATE_POST_STATE,
} from '../actions'

const empty = {
  perId : {},
  allIds : [],
  selected: '',
  visible: [],
  sortCriteria: 'timestamp',
  sortDirection: 'descending',
}

const listReducer = (state = empty, action) => {
  switch (action.type) {

    case UPDATE_POST_STATE:
      return {
        ...state,
        perId: {
          ...state.perId,
          [action.thisPost.id]: action.thisPost,
        },
      }

    case SORT_POSTS:
      return {
        ...state,
        sortCriteria: action.field,
        sortDirection: state.sortCriteria === action.field ?
          (state.sortDirection === 'descending' ? 'ascending' : 'descending') :
          'descending',
        visible: state.sortDirection === 'descending' ?
          state.visible.slice().sort(function(id1, id2) { return (state.perId[id2][action.field] - state.perId[id1][action.field])}) :
          state.visible.slice().sort( function(id1, id2) { return (state.perId[id1][action.field] - state.perId[id2][action.field])}),
      }

    case ALL_POSTS_IN:
      return {
        ...state,
        selected: '',
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result},{}),
        allIds: action.posts.map(thisPost => thisPost.id),
        visible: action.posts
          .filter(thisPost => thisPost.deleted === false)
          .map((thisPost)=>(thisPost.id)),
      }

    case CAT_POSTS_IN:
      const idArray = action.posts.map(thisPost => thisPost.id)
      return {
        ...state,
        selected: '',
        allIds: [...new Set(state.allIds.concat(idArray))],
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result}, state.perId),
        visible: idArray,
      }

    case REMOVE_POST:
      return{
        ...state,
        selected: '',
        visible: state.visible.filter(id => id !== action.id),
        perId: {
          ...state.perId,
          [action.id]: {
            ...state.perId[action.id],
            deleted: true
          }
        }
      }

    case SINGLE_POST_IN:
      let previousVisibles = state.allIds.filter(id => state.perId[id].deleted === false && state.perId[id].category === action.path)
      return {
        ...state,
        selected: action.id,
        allIds: [action.id].concat(state.allIds),
        perId: {
          ...state.perId,
          [action.id]: {
            id : action.id,
            timestamp: action.timestamp,
            title: action.title,
            body: action.body,
            author: action.author,
            category: action.category,
            voteScore: action.voteScore,
            deleted: action.deleted
          }
        },
        visible: [action.id].concat(previousVisibles)
        // need add to 'visible' specifically that post just created through form, because that post wasn't present in previous state.
      }

    case COUNT_COMMENTS_LOAD_DETAILS:
      return {
        ...state,
        selected: action.postId
      }

    case SHOW_MORE:
      return {
        ...state,
        selected: action.postId
      }

    case SHOW_LESS:
      return {
        ...state,
        selected: ''
      }

    case SELECT_CATEGORY:
      return {
        ...state,
        selected: '',
        visible: action.path == null ?
          state.allIds.filter(id => state.perId[id].deleted === false) :
          state.allIds.filter(id => state.perId[id].deleted === false && state.perId[id].category === action.path)
      }

    default:
      return state
  }
}

export default listReducer
