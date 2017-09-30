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
        perId: action.comments.reduce((result,item) => {result[item.id] = item;return result},{}),
        allIds: action.comments.map(thisComment => thisComment.id),
        SelectedId: ''
      }

    default:
      return state
  }
}

export default commentsReducer
