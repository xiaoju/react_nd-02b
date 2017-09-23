import {
  FETCH_CATEGORY,
  SELECT_CATEGORY
} from '../actions'

const Dummy = {
  'perId': {
    'eradaaaaaaaaaaaesd': { 'id': 'eradaaaaaaaaaaaesd', 'name': 'react', 'path': 'react'},
    'eradbbbbbbbbbbbesd': { 'id': 'eradbbbbbbbbbbbesd', 'name': 'redux', 'path': 'redux'},
    'eradcccccccccccesd': { 'id': 'eradcccccccccccesd', 'name': 'udacity', 'path': 'udacity'},
    'eraddddddddddddesd': { 'id': 'eraddddddddddddesd', 'name': 'trolls', 'path': 'react/trolls'},
    'eraeeeeeeeeeeeeesd': { 'id': 'eraeeeeeeeeeeeeesd', 'name': 'trolls', 'path': 'udacity/trolls'}
  },
  'allIds': [
    'eradaaaaaaaaaaaesd',
    'eradbbbbbbbbbbbesd',
    'eradcccccccccccesd',
    'eraddddddddddddesd',
    'eraeeeeeeeeeeeeesd'
  ],
  'SelectedId': null
}

const Empty = {
  'perId': {},
  'allIds': [],
  'SelectedId': null
}

const categoryReducer = (state = Dummy, action) => {
  switch (action.type) {

    case FETCH_CATEGORY:
      console.log('(inside reducer) action.Categoriess:', action.Categories)
      return action.Categories

    case SELECT_CATEGORY:
      return {
        ...state,
        SelectedId: action.thisCategory.id
      }

    default:
      return state
  }
}

export default categoryReducer
