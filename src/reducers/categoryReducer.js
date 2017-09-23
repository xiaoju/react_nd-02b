import {
  FETCH_CATEGORY,
  SELECT_CATEGORY,
  ADD_POST,
  SHOW_ALL_CATEGORY
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
// };

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

// const Dummy = {
//   'perId': {
//     'eradaaaaaaaaaaaesd': { 'id': 'eradaaaaaaaaaaaesd', 'name': 'react', 'path': 'react'},
//     'eradbbbbbbbbbbbesd': { 'id': 'eradbbbbbbbbbbbesd', 'name': 'redux', 'path': 'redux'},
//     'eradcccccccccccesd': { 'id': 'eradcccccccccccesd', 'name': 'udacity', 'path': 'udacity'},
//     'eraddddddddddddesd': { 'id': 'eraddddddddddddesd', 'name': 'trolls', 'path': 'react/trolls'},
//     'eraeeeeeeeeeeeeesd': { 'id': 'eraeeeeeeeeeeeeesd', 'name': 'trolls', 'path': 'udacity/trolls'}
//   },
//   'allIds': [
//     'eradaaaaaaaaaaaesd',
//     'eradbbbbbbbbbbbesd',
//     'eradcccccccccccesd',
//     'eraddddddddddddesd',
//     'eraeeeeeeeeeeeeesd'
//   ],
//   'SelectedId': null
// }

// const Dummy2 = {
//   'perPath': {
//     'react': { 'name': 'react', 'path': 'react'},
//     'redux': { 'name': 'redux', 'path': 'redux'},
//     'udacity': { 'name': 'udacity', 'path': 'udacity'},
//     'react/trolls': { 'name': 'trolls', 'path': 'react/trolls'},
//     'udacity/trolls': { 'name': 'trolls', 'path': 'udacity/trolls'}
//   },
//   'allPaths': [
//     'react',
//     'redux',
//     'udacity',
//     'react/trolls',
//     'udacity/trolls'
//   ],
//   'SelectedPath': null
// }

const Empty = {
  'perPath': {},
  'allPaths': [],
  'SelectedPath': null
}

const categoryReducer = (state = Empty, action) => {
  switch (action.type) {
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
        SelectedPath: action.path
      }

    case ADD_POST:
      return {
        ...state,
        SelectedPath: action.path
      }

    case SHOW_ALL_CATEGORY:
      return {
        ...state,
        SelectedPath: null
      }

    default:
      return state
  }
}

export default categoryReducer
