import { FETCH_CATEGORIES } from '../constants/action-types'

const categoryReducer = (state={}, action) => {
  switch(action.type) {
    case FETCH_CATEGORIES.SUCCESS:
      const { categories } = action.data

      return categories.reduce((obj, item) => {
        obj[item.name] = item
        return obj
      }, {})

    default:
      return state
  }
}

export default categoryReducer
