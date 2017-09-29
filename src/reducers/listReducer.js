import {
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  SINGLE_POST_IN,
  REMOVE_POST,
  SHOW_POST,

  SELECT_POST,
  SELECT_ALL_POST,
  SELECT_NONE_POST,

  SELECT_CATEGORY

} from '../actions'

const empty = {
  perId : {},
  allIds : [],
  SelectedIds: [],
  VisibleIds: []
}

const listReducer = (state = empty, action) => {
  switch (action.type) {

    case ALL_POSTS_IN:
      return {
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result},{}),
        allIds: action.posts.map(thisPost => thisPost.id),
        VisibleIds: action.posts
          .filter(thisPost => thisPost.deleted === false)
          .map((thisPost)=>(thisPost.id)),
        SelectedIds: []
      }

    case CAT_POSTS_IN:
      const idArray = action.posts.map(thisPost => thisPost.id)
      return {
        allIds: [...new Set(state.allIds.concat(idArray))],
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result}, state.perId),
        VisibleIds: idArray,
        SelectedIds: []
      }

    case REMOVE_POST:
      return{
        ...state,
        VisibleIds: state.VisibleIds.filter(id => id !== action.id),
        SelectedIds: [],
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
        allIds: [action.id].concat(state.allIds),
        SelectedIds: [action.id],
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
        VisibleIds: [action.id].concat(previousVisibles)
        // need add to VisibleIds specifically that post just created through form, because that post wasn't present in previous state.
      }

    case SELECT_POST:
      // a toggle function: if postId belongs to array, then remove it, otherwise adds it.
      // useful to delete several posts in one clic, from the Posts List
      if (state.SelectedIds.includes(action.id)) {
        return {
          ...state,
          SelectedIds: state.SelectedIds.filter((id)=>(id !== action.id))
        }
      } else {
        return {
          ...state,
          SelectedIds: state.SelectedIds.concat(action.id)
        }
      }

    case SHOW_POST:
      return {
        ...state,
        SelectedIds: [].concat(action.id)
      }

    case SELECT_NONE_POST:
      return {
        ...state,
        SelectedIds: []
      }

    case SELECT_ALL_POST:
      return {
        ...state,
        SelectedIds: state.VisibleIds
      }

    case SELECT_CATEGORY:
      // probably this will only be used when fetchCatPosts/fetchAllPosts API
      // call failed and you still want to show something to user
      // if path is undefined, show all categories. If path is defined, show that category.
      // '== null' catches both null and undefined
      return {
        ...state,
        SelectedIds: [],
        VisibleIds: action.path == null ?
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
