const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
})

export const API = 'API'

export const FETCH_CATEGORIES = asyncActionType('FETCH_CATEGORIES')
export const FETCH_POSTS = asyncActionType('FETCH_POSTS')

export const SEND_POST_VOTE = asyncActionType('SEND_POST_VOTE')
