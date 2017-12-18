import { FETCH_POST, FETCH_POSTS, SEND_POST_VOTE, DELETE_POST, CREATE_POST } from '../constants/action-types'

const defaultState = { processing: false }

const postsReducer = (state=defaultState, action) => {
  switch(action.type) {
    case FETCH_POSTS.SUCCESS:
      const newState = action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

      return { ...newState, processing: false}

    case FETCH_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case SEND_POST_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case DELETE_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case CREATE_POST.PENDING:
      return { ...state, processing: true }

    case CREATE_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    default:
      return state
  }
}

export default postsReducer
