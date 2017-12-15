import { FETCH_POST, FETCH_POSTS, SEND_POST_VOTE, DELETE_POST } from '../constants/action-types'

const postsReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_POSTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    case FETCH_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    case SEND_POST_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    case DELETE_POST.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    default:
      return state
  }
}

export default postsReducer
