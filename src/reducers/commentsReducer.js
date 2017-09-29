import {
  COMMENTS_IN,
} from '../actions'

const Empty = {
  'perId': {},
  'allIds': [],
  'SelectedId': ''
}

const commentsReducer = (state = Empty, action) => {
  switch (action.type) {

    case COMMENTS_IN:
      return {
        state
      }

    default:
      return state
  }
}

export default commentsReducer
