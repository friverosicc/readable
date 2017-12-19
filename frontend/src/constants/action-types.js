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
export const CREATE_POST = asyncActionType('CREATE_POST')

export const FETCH_COMMENTS = asyncActionType('FETCH_COMMENTS')
export const FETCH_COMMENT = asyncActionType('FETCH_COMMENT')
export const SEND_COMMENT_VOTE = asyncActionType('SEND_COMMENT_VOTE')
export const DELETE_COMMENT = asyncActionType('DELETE_COMMENT')
export const CREATE_COMMENT = asyncActionType('CREATE_COMMENT')
