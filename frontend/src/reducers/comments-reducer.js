import { FETCH_COMMENTS } from '../constants/action-types'

const commentsReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_COMMENTS.SUCCESS:
      return action.data.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    default:
      return state
  }
}

export default commentsReducer
