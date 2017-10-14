import {
  SHOW_EDIT_COMMENT_FORM,
  HIDE_EDIT_COMMENT_FORM,
} from '../actions/types'

const empty = {
  showingEditCommentForm: false,
  body: '',
  commentId: '',
  postId: '',
}

const editCommentFormReducer = (state = empty, action) => {
  switch (action.type) {

    case SHOW_EDIT_COMMENT_FORM:
      return {
        ...state,
        showingEditCommentForm: true,
        body: action.body,
        commentId: action.commentId,
        postId: action.postId,
      }

    case HIDE_EDIT_COMMENT_FORM:
      return {
        ...state,
        showingEditCommentForm: false,
        body: '',
        commentId: '',
        postId: '',
      }

    default:
      return state
  }
}

export default editCommentFormReducer
