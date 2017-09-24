import {
  ALL_POSTS_IN,
  REMOVE_POST,
  ADD_POST,
  SHOW_POST,

  SELECT_POST,
  SELECT_ALL_POST,
  SELECT_NONE_POST,

  SELECT_CATEGORY,
  SHOW_ALL_CATEGORY

} from '../actions'

const empty = {
  perId : {},
  allIds : {},
  SelectedIds: [null],
  VisibleIds: []
}

const listReducer = (state = empty, action) => {
  switch (action.type) {
    case ALL_POSTS_IN:
      const allIds = action.posts.map((item) => (item.id))
      return {
        ...state,
        perId: action.posts.reduce((result,item) => {result[item.id] = item;return result},{}),
        allIds: allIds,
        VisibleIds: allIds
      }

    case REMOVE_POST:
      // for allIds, remove from allIds array any id that belongs to SelectedIds.
      // same for VisibleIds.
      // same for perId, but more convoluted because perId is an object, not an array:
      // the reduce function rebuilds the perId object from empty object {} by adding any sub-object
      // that meets same criteria as for allIds.
      const allIdsNew = state.allIds.filter(id => !state.SelectedIds.includes(id))
      return {
        VisibleIds: state.VisibleIds.filter(id => !state.SelectedIds.includes(id)),
        allIds: allIdsNew,
        perId: allIdsNew.reduce((result, id) => {result[id] = state.perId[id];return result}, {}),
        SelectedIds: [null]
      }

    case ADD_POST:
      const {id, timestamp, title, body, author, path } = action
      return {
        allIds: [id].concat(state.allIds),
        // new id added at begin of array.
        // Other ways: state.allIds.concat(id)   [].concat(state.allIds, id)   [id].concat(state.allIds)
        SelectedIds: [id],  // same as [].concat(action.thisPost.id)
        perId: {
          ...state.perId,
          [id]: {
            id,
            timestamp,
            title,
            body,
            author,
            path
          }
        },
        VisibleIds: [id].concat(state.allIds.filter((id)=>(state.perId[id].category === path)))
        // need add specifically the post just created through form, because that post wasn't present in previous state.
      }

    case SELECT_POST:
      // a toggle function: if postId belongs to array, then remove it, otherwise adds it.
      // for example if want to delete several posts from the Posts List
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
      return {
        ...state,
        SelectedIds: [],
        VisibleIds: (action.path === null) ? state.allIds : state.allIds.filter((id)=>(state.perId[id].category === action.path))
      }

    case SHOW_ALL_CATEGORY:
      return {
        ...state,
        SelectedIds: [],
        VisibleIds: state.allIds
      }

    default:
      return state
  }
}

export default listReducer
