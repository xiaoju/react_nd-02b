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
  'SelectedId': 'eradaaaaaaaaaaaesd'
}

const Empty = {
  'perId': {},
  'allIds': [],
  'SelectedId': ''
}

const categoryReducer = (state = Dummy, action) => {
  switch (action.type) {

    case FETCH_CATEGORY:
      return Dummy

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
