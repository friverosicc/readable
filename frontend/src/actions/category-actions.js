import { API, FETCH_CATEGORIES } from '../constants/action-types'

export const fetchCategories = () => ({
  type: API,
  payload: Object.assign({ url: 'categories', method: 'GET' }, FETCH_CATEGORIES)
})
