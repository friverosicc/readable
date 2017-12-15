const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`
})

export const API = 'API'

export const FETCH_CATEGORIES = asyncActionType('FETCH_CATEGORIES')

export const FETCH_POSTS = asyncActionType('FETCH_POSTS')
export const FETCH_POST = asyncActionType('FETCH_POST')
export const SEND_POST_VOTE = asyncActionType('SEND_POST_VOTE')
export const DELETE_POST = asyncActionType('DELETE_POST')

export const FETCH_COMMENTS = asyncActionType('FETCH_COMMENTS')
