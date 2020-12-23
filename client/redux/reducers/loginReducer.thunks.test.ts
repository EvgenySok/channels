import { register, loginActions } from './loginActions'
// jest.mock('./loginActions')


describe('test for register thunk', () => {
  beforeEach(() => { })
  const thunk = register()

  test('success register thunk', async () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn().mockReturnValueOnce({ loginReducer: 'test' })
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve({ ok: true, json: () => [{ msg: 'test', param: 'test' }] }))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, loginActions.setMessagesForLoginForm([{ msg: 'test', param: 'test' }]))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, loginActions.updatePassword(''))
  })

  test('NOT success register thunk', async () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn().mockReturnValueOnce({ loginReducer: 'test' })
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve({ ok: false, json: () => [{ msg: 'test', param: 'test' }] }))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, loginActions.setMessagesForLoginForm([{ msg: 'test', param: 'test' }]))
  })
})

describe('test for login reducer thunks', () => {
  beforeEach(() => { })
  const thunk = register()

  test('success register thunk', async () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn().mockReturnValueOnce({ loginReducer: 'test' })
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve({ ok: true, json: () => [{ msg: 'test', param: 'test' }] }))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, loginActions.setMessagesForLoginForm([{ msg: 'test', param: 'test' }]))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, loginActions.updatePassword(''))
  })

  test('NOT success register thunk', async () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn().mockReturnValueOnce({ loginReducer: 'test' })
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve({ ok: false, json: () => [{ msg: 'test', param: 'test' }] }))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, loginActions.setMessagesForLoginForm([{ msg: 'test', param: 'test' }]))
  })
})