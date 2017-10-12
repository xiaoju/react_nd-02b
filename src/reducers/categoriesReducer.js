import {
  FETCH_CATEGORY,
  SELECT_CATEGORY,
  ALL_POSTS_IN,
  CAT_POSTS_IN,
} from '../actions'

const empty = {
  allPaths: [],
  selected: '',
}

const categoryReducer = (state = empty, action) => {
  switch (action.type) {

    case FETCH_CATEGORY:
      return {
        ...state,
        allPaths: action.categories.categories.map((item)=>(item.name))
      }

    case SELECT_CATEGORY:
    case ALL_POSTS_IN:
    case CAT_POSTS_IN:
      return {
        ...state,
        // '== null' catches both null and undefined
        selected: action.category == null ? '' : action.category
      }

    default:
      return state
  }
}

export default categoryReducer
