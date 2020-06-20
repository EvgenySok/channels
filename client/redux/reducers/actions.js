import {
  UPLOAD_PRODUCT_LIST,
} from './types'

export function uploadProductList(dispatch) {
  const lincProduct = '/api/webstore/v1/list'

  return async () => {
    const productList = await fetch(lincProduct).then((data) => data.json())
    dispatch({
      type: UPLOAD_PRODUCT_LIST,
      payload: productList
    })
  }
}

export function summa(array, currency) {
  return array
    .reduce((acc, item) => {
      return acc + item.quantityInBusket * item.price[currency]
    }, 0)
    .toFixed(2)
}
