import { combineReducers } from 'redux'
import categoryReducer from './category-reducer'
import postReducer from './post-reducer'

const comments = (stata, action) => ([])

export default combineReducers({
  categories: categoryReducer,
  posts: postReducer,
  comments
})
