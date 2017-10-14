import {
  COUNT_COMMENTS,
  COUNT_COMMENTS_LOAD_DETAILS,
  SHOW_MORE,
  SHOW_LESS,
  SORT_COMMENTS,
  UPDATE_COMMENT_STATE,
} from '../actions/types'

const empty = {
  allIds: [],
  perId: {},
  sortCriteria: '',
  sortDirection: 'desc',
  commentsCount: {},
}

const commentsReducer = (state = empty, action) => {
  switch (action.type) {

    case COUNT_COMMENTS_LOAD_DETAILS:
    return {
      ...state,
      allIds: action.comments.map(thisComment => thisComment.id),
      perId: action.comments.reduce((result,thisComment) => {
        result[thisComment.id] = thisComment; return result;}, {}),
      commentsCount: {
        ...state.commentsCount,
        [action.postId]: action.comments.length,
      }
    }

    case COUNT_COMMENTS:
      return {
        ...state,
        commentsCount: {
          ...state.commentsCount,
          [action.postId]: action.comments.length,
        }
      }

    case UPDATE_COMMENT_STATE:
      return {
        ...state,
        perId: {
          ...state.perId,
          [action.thisComment.id]: action.thisComment
        }
      }

    case SORT_COMMENTS:
      return {
        ...state,
        sortCriteria: action.field,
        sortDirection: state.sortDirection === 'desc' ? 'asc' : 'desc',
        allIds: state.sortDirection === 'asc' ?
          state.allIds.slice().sort(function(id1, id2) { return (
            state.perId[id2][action.field] - state.perId[id1][action.field])}) :
          state.allIds.slice().sort(function(id1, id2) { return (
            state.perId[id1][action.field] - state.perId[id2][action.field])}),
      }

    case SHOW_MORE:
      return {
        ...state,
        allIds: action.comments.map(thisComment => thisComment.id),
        perId: action.comments.reduce((result,thisComment) => {
          result[thisComment.id] = thisComment; return result;}, {}),
      }

    case SHOW_LESS:
      return {
        ...state,
        perId: {},
        allIds: [],
      }

    default:
      return state
  }
}

export default commentsReducer
