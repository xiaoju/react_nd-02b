import {
  FETCH_CATEGORY,

  SELECT_CATEGORY,
  SELECT_ALL_CATEGORY,
  SELECT_NONE_CATEGORY
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
  'SelectedIds': ['eradaaaaaaaaaaaesd', 'eraddddddddddddesd']
}

const Empty = {
  'perId': {},
  'allIds': [],
  'SelectedIds': []
}

const categoryReducer = (state = Dummy, action) => {
  switch (action.type) {

    case FETCH_CATEGORY:
      return Dummy

    case SELECT_CATEGORY:
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

    case SELECT_NONE_CATEGORY:
      return {
        ...state,
        SelectedIds: []
      }

    case SELECT_ALL_CATEGORY:
      return {
        ...state,
        SelectedIds: state.allIds
      }

    default:
      return state
  }
}

export default categoryReducer
