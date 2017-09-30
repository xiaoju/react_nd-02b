import {
  FETCH_CATEGORY,
  SELECT_CATEGORY,
  ALL_POSTS_IN,
  CAT_POSTS_IN,
  SINGLE_POST_IN
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

const empty = {
  'perPath': {},
  'allPaths': [],
  'selected': null
}

const categoryReducer = (state = empty, action) => {
  switch (action.type) {

    case FETCH_CATEGORY:
      return {
        ...state,
        // converting the output of API into a normalized state format:
        perPath: action.categories.categories.reduce((acc, curr) => {acc[curr.path] = curr; return acc}, {}),
        allPaths: action.categories.categories.map((item)=>(item.name))
      }

    case SELECT_CATEGORY:
    case ALL_POSTS_IN:
    case CAT_POSTS_IN:
    case SINGLE_POST_IN:
      return {
        ...state,
        // '== null' catches both null and undefined
        selected: action.path == null ? null : action.path
      }

    default:
      return state
  }
}

export default categoryReducer
