import {
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  SINGLE_POST_IN,
  REMOVE_POST,

  // SELECT_POST,

  SHOW_MORE,
  SHOW_LESS,

  SELECT_CATEGORY,

} from '../actions'

const empty = {
  perId : {},
  allIds : [],
  selected: '',
  visible: [],
}

const listReducer = (state = empty, action) => {
  switch (action.type) {

    case ALL_POSTS_IN:
      return {
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

    // case SELECT_POST:
    //   return {
    //     ...state,
    //     selected: action.id === state.selected ? '' : action.selected
    //   }

    case SELECT_CATEGORY:
      // probably this will only be used when fetchCatPosts/fetchAllPosts API
      // call failed and you still want to show something to user
      // if path is undefined, show all categories. If path is defined, show that category.
      // '== null' catches both null and undefined
      return {
        ...state,
        selected: '',
        visible: action.path == null ?
          state.allIds.filter(id => state.perId[id].deleted === false) :
          state.allIds.filter(id => state.perId[id].deleted === false && state.perId[id].category === action.path)
        // This '|| []' at ends of above line avoids a bug where user enters the app by directly typing a category name.
        // By then state.allIds is still not populated, results in undefined, crashes the app.
      }

    default:
      return state
  }
}

export default listReducer