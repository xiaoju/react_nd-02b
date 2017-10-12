import {
  COUNT_COMMENTS,
  COUNT_COMMENTS_LOAD_DETAILS,
  SHOW_MORE,
  SHOW_LESS,
  SELECT_COMMENT,
  SORT_COMMENTS,
  UPDATE_COMMENT_STATE,
} from '../actions'

const empty = {
  allIds: [],
  perId: {},
  selected: '',
  sortCriteria: 'timestamp',
  sortDirection: 'descending',
  commentsCount: {},
}

const commentsReducer = (state = empty, action) => {
  switch (action.type) {

    case COUNT_COMMENTS_LOAD_DETAILS:
    return {
      ...state,
      allIds: action.comments.map(thisComment => thisComment.id),
      perId: action.comments.reduce((result,thisComment) => {result[thisComment.id] = thisComment; return result;}, {}),
      selected: '',
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
        sortDirection: state.sortCriteria === action.field ?
          (state.sortDirection === 'descending' ? 'ascending' : 'descending') :
          'descending',
        allIds: state.sortDirection === 'descending' ?
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
        selected: '',
      }

    case SHOW_LESS:
      return empty

    case SELECT_COMMENT:
      return {
        ...state,
        selected: state.selected === action.commentId ? '' : action.commentId,
      }

    default:
      return state
  }
}

export default commentsReducer
