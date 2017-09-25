import {
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  FETCH_CATEGORY,
  SELECT_CATEGORY,
  ADD_POST
} from '../actions'

// Here the data as received from API:
//  {
//     "categories": [
//         {
//             "name": "react",
//             "path": "react"
//         },
//         {
//             "name": "redux",
//             "path": "redux"
//         },
//         {
//             "name": "udacity",
//             "path": "udacity"
//         }
//     ]
// }
//  Here the format of redux state, after conversion by FETCH_CATEGORY case:
// {
//   'perPath': {
//     'react': { 'name': 'react', 'path': 'react'},
//     'redux': { 'name': 'redux', 'path': 'redux'},
//     'udacity': { 'name': 'udacity', 'path': 'udacity'}
//   },
//   'allPaths': ['react', 'redux', 'udacity'],
//   'SelectedPath': null
// }

const Empty = {
  'perPath': {},
  'allPaths': [],
  'SelectedPath': null
}

const categoryReducer = (state = Empty, action) => {
  switch (action.type) {

    case ALL_POSTS_IN:
      return {
        ...state,
        SelectedPath: null
      }

    case CAT_POSTS_IN:
      return {
        ...state,
        SelectedPath: action.path == null ? null : action.path
      }

    case FETCH_CATEGORY:
      return {
        ...state,
        // and now we convert the output of API into a normalized state format:
        perPath: action.categories.categories.reduce((acc, curr) => {acc[curr.path] = curr; return acc}, {}),
        allPaths: action.categories.categories.map((item)=>(item.name))
      }

    case SELECT_CATEGORY:
      return {
        ...state,
        SelectedPath: action.path == null ? null : action.path
      }

    // same as previous!!
    case ADD_POST:
      // '== null' catches both null and undefined
      return {
        ...state,
        SelectedPath: action.path == null ? null : action.path
      }

    default:
      return state
  }
}

export default categoryReducer
