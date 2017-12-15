import { FETCH_COMMENTS, SEND_COMMENT_VOTE, DELETE_COMMENT } from '../constants/action-types'

const commentsReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_COMMENTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    case SEND_COMMENT_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    case DELETE_COMMENT.SUCCESS:
      return { ...state, [action.data.id]: action.data }

    default:
      return state
  }
}

export default commentsReducer
