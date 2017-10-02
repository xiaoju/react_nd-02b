import {
  SHOW_MORE,
  SHOW_LESS,
  SELECT_COMMENT,
} from '../actions'

const empty = {
  allIds: [],
  perId: {},
  selected: '',
}

const commentsReducer = (state = empty, action) => {
  switch (action.type) {

    case SHOW_MORE:
      return {
        allIds: action.comments.map(thisComment => thisComment.id),
        perId: action.comments.reduce((result,thisComment) => {result[thisComment.id] = thisComment; return result;}, {}),
        selected: '',
      }

    case SHOW_LESS:
      return empty

    case SELECT_COMMENT:
      return {
        ...state,
        selected: state.selected === action.commentId ? '' : action.commentId,
      }

    // case REMOVE_POST:
    //   let thoseToDelete = state.allIds.filter(commentId => state.perId[commentId].parentId === id)
    //   let theKeepers = state.allIds.filter(commentId => state.perId[commentId].parentId !== id)
    //
    //   return {
    //     ...state,
    //     perId: state.allIds.reduce(
    //       (result, thisCommentId) => { result[thisCommentId].    ; return result},
    //       {}
    //     )
    //     ,
    //     selected: '',
    //     visible: [],
    //   }

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
