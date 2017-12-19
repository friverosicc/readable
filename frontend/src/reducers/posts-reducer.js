import { FETCH_POST, FETCH_POSTS, SEND_POST_VOTE, DELETE_POST, CREATE_POST, EDIT_POST } from '../constants/action-types'

const defaultState = { processing: false }

const postsReducer = (state=defaultState, action) => {
  switch(action.type) {
    case FETCH_POSTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, { processing: false })

    case FETCH_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case SEND_POST_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case DELETE_POST.PENDING:
      return { ...state, processing: true }

    case DELETE_POST.SUCCESS:
      const keys = Object.keys(state).filter(key => key !== action.data.id)

      return keys.reduce((obj, item) => {
        obj[item] = state[item]
        return obj
      }, { processing: false })

    case CREATE_POST.PENDING:
      return { ...state, processing: true }

    case CREATE_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case EDIT_POST.PENDING:
      return { ...state, processing: true }

    case EDIT_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    default:
      return state
  }
}

export default postsReducer
