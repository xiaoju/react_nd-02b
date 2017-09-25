import {
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  REMOVE_POST,
  ADD_POST,
  SHOW_POST,

  SELECT_POST,
  SELECT_ALL_POST,
  SELECT_NONE_POST,

  SELECT_CATEGORY

} from '../actions'

const empty = {
  perId : {},
  allIds : {},
  SelectedIds: [null],
  VisibleIds: []
}

const listReducer = (state = empty, action) => {
  // const {posts, id, timestamp, title, body, author, path } = action
  switch (action.type) {

    case ALL_POSTS_IN:
      return {
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result},{}),
        // TODO categories should not be hardcoded here
        allIds: ['redux','react','udacity'].reduce(
          (result, thisCat) => {
            result[thisCat]=action.posts
              .filter((thisPost) => (thisPost.category === thisCat))
              .map((thisPost)=>(thisPost.id));
            return result
          },
          {}
        ),
        VisibleIds: action.posts.map((thisPost)=>(thisPost.id)),
        SelectedIds: [null]
      }

    case CAT_POSTS_IN:
      const idArray = action.posts.map(thisPost => thisPost.id)
      return {
        allIds: {
          ...state.allIds,
          [action.path]: idArray
        },
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result}, state.perId),
        VisibleIds: idArray,
        SelectedIds: [null]
      }

    case REMOVE_POST:
      // for allIds, remove from the allIds arrays any id that belongs to SelectedIds.
      // same for perId, but more convoluted because perId is an object, not an array:
      // the reduce function rebuilds the perId object from empty object {} by adding any sub-object
      // that meets same criteria as for allIds.
        return {
          ...state,
          allIds: Object.keys(state.allIds)
                .reduce(
                  (result,thisCat) => {
                    result[thisCat] = state.allIds[thisCat].filter( id => !state.SelectedIds.includes(id)) ;
                    return result
                    },
                  {}),
          perId: Object.keys(state.perId)
                .filter(id => !state.SelectedIds.includes(id))
                .reduce((result, id) => {result[id] = state.perId[id];return result;}, {}),
          SelectedIds: [null],
          VisibleIds: state.VisibleIds.filter(id => !state.SelectedIds.includes(id))
        }

    case ADD_POST:
      return {
        allIds: {
          ...state.allIds,
          [action.path]: [action.id].concat(state.allIds[action.path])
        },
        // new id added at begin of array.
        // Other ways: state.allIds.concat(id)   [].concat(state.allIds, id)   [id].concat(state.allIds)
        SelectedIds: [action.id],  // same as [].concat(action.thisPost.id)
        perId: {
          ...state.perId,
          [action.id]: {
            id: action.id,
            timestamp: action.timestamp,
            title: action.title,
            body: action.body,
            author: action.author,
            path: action.path
          }
        },
        // VisibleIds: [id].concat(state.allIds.filter((id)=>(state.perId[id].category === path)))
        VisibleIds: [action.id].concat(state.VisibleIds)
        // need add specifically the post just created through form, because that post wasn't present in previous state.
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
        SelectedIds: [null]
      }

    case SELECT_ALL_POST:
      return {
        ...state,
        SelectedIds: state.VisibleIds
      }

    case SELECT_CATEGORY:
      // if path is undefined, show all categories. If path is defined, show that category!
      // == null catches both null and undefined
      return {
        ...state,
        SelectedIds: [null],      // this is easier, simply!
        VisibleIds: action.path == null ?
          Object.keys(state.allIds).reduce((resultArray, thisCat) => resultArray.concat(state.allIds[thisCat]),[]) :
          state.allIds[action.path] || []
        // This '|| []' avoids a bug where user enters the app by directly typing a category name.
        // By then state.allIds is still not populated, results in undefined, crashes the app.
      }

    default:
      return state
  }
}

export default listReducer
