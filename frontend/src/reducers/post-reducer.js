import { FETCH_POSTS, SEND_POST_VOTE, DELETE_POST } from '../constants/action-types'

const postReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_POSTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    case SEND_POST_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    case DELETE_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    default:
      return state
  }
}

export default postReducer
