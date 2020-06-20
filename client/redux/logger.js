import {
  SORT_LIST_123,
  SORT_LIST_ABC,
  STATE_CURRENCY_CAD,
  STATE_CURRENCY_EUR,
  STATE_CURRENCY_USD,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from './reducers/types'

// navigate to ${url} page

const arrCurrency = [STATE_CURRENCY_EUR, STATE_CURRENCY_CAD, STATE_CURRENCY_USD]

// action - объект с действием (type and payload)
// getState() - старое/новое состояние стора

async function sendMessage(message) {
  const mes = { message }
  await fetch('/api/webstore/v1/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mes)
  })
}

const logger = ({ getState }) => {
  return (next) => (action) => {
    let message = ''
    const currentAction = action.type
    const prevStateCurrency = getState().list.currency
    const returnValue = next(action)
    const newStateCurrency = getState().list.currency

    if (currentAction === '@@router/LOCATION_CHANGE') {
      message = `navigate to ${action.payload.location.pathname} page##${+new Date()}&`
    }
    if (currentAction === SORT_LIST_ABC) {
      message = `sort by alphabetically##${+new Date()}&`
    }
    if (currentAction === SORT_LIST_123) {
      message = `sort by price##${+new Date()}&`
    }
    if (currentAction === DELETE_PRODUCT) {
      message = `remove ${action.payload} from the backet##${+new Date()}&`
    }
    if (currentAction === ADD_PRODUCT) {
      message = `add ${action.payload} to the backet##${+new Date()}&`
    }
    if (arrCurrency.indexOf(currentAction) >= 0) {
      message = `change currency from ${prevStateCurrency} to ${newStateCurrency}##${+new Date()}&`
    }

    if (message) {
      sendMessage(message)
    }

    return returnValue
  }
}

export default logger
