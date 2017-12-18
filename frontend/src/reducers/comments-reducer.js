import { FETCH_COMMENTS, SEND_COMMENT_VOTE, DELETE_COMMENT, CREATE_COMMENT } from '../constants/action-types'

const defaultState = { processing: false }

const commentsReducer = (state=defaultState, action) => {
  switch(action.type) {
    case FETCH_COMMENTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, { processing: false })

    case SEND_COMMENT_VOTE.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    case DELETE_COMMENT.SUCCESS:
      const keys = Object.keys(state).filter(key => key !== action.data.id)

      return keys.reduce((obj, item) => {
        obj[item] = state[item]
        return obj
      }, { processing: false })

    case CREATE_COMMENT.PENDING:
      return { ...state, processing: true }

    case CREATE_COMMENT.SUCCESS:
      return { ...state, [action.data.id]: action.data, processing: false }

    default:
      return state
  }
}

export default commentsReducer
