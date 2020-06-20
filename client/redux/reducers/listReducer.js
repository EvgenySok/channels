import {
  UPLOAD_PRODUCT_LIST,
  SORT_LIST_123,
} from './types'

const inicialState = {}


// eslint-disable-next-line import/prefer-default-export
export const listReducer = (state = inicialState, action) => {

  switch (action.type) {
    case UPLOAD_PRODUCT_LIST:
      return { ...state, productList: action.payload }

    case SORT_LIST_123: {
      return {
        ...state
      }
    }

    default:
      return state
  }
}
