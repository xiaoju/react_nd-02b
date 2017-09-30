import {
  SHOW_MORE,
  SHOW_LESS,
  SELECT_COMMENT,
} from '../actions'

const empty = {
  'perId': {},
  'allIds': [],
  'visible': [],
  'selected': ''
}

const commentsReducer = (state = empty, action) => {
  switch (action.type) {

    case SHOW_MORE:
      let allIdsNew = state.allIds.concat(action.comments.map(thisComment => thisComment.id))
      return {
        perId: action.comments.reduce((result,thisComment) => {result[thisComment.id] = thisComment; return result;}, state.perId),
        allIds: allIdsNew,
        visible: allIdsNew.filter(commentId => state.perId[commentId].parentId === action.postId),
        toDelete: '',
      }

    case SHOW_LESS:
      return {
        ...state,
        visible: [],
        toDelete: '',
      }

    case SELECT_COMMENT:
      return {
        ...state,
        selected: state.selected === action.commentId ? '' : action.commentId,
      }

    // case UPDATE_COMMENT:
    //   return {
    //     ...state,
    //     perId: xxxxxxxxx
    //   }

    // case DELETE_COMMENT:

    default:
      return state
  }
}

export default commentsReducer
