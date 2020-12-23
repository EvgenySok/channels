import { chatActions } from './chatActions'
import { UserType, ChannelType } from './../../typescriptTypes'
import { socketActions } from './../socketMiddleware'
import chatReducer, { InicialStateChatReducer } from './chatReducer'

let state: InicialStateChatReducer

describe('Test for chatReducer', () => {
  beforeEach(() => {
    state = {
      currentMessage: '',
      currentChannel: {
        _id: '',
        name: '',
        description: '',
        scrollPosition: null,
      },
      channels: [{
        _id: 'channel 1',
        name: 'channel 1',
        description: 'description 1',
        scrollPosition: 245,
      },
      {
        _id: 'channel 2',
        name: 'channel 2',
        description: 'description 2',
        scrollPosition: null,
      },
      {
        _id: 'channel 3',
        name: 'channel 3',
        description: ' description 3',
        scrollPosition: null,
      },
      ],
      users: [
        {
          _id: '5f18aaeb1b44850502e19befIuliia',
          role: ["user"],
          img: 'img',
          firstName: 'Iuliia',
          lastName: 'Savinovskikh',
          isOnline: true,
          scrollPosition: null
        },
        {
          _id: '5f18ac534b342c000401608a',
          role: ["user", "admin"],
          img: 'img',
          firstName: 'Evgeny',
          lastName: 'Sokov',
          isOnline: true,
          scrollPosition: null
        },
        {
          _id: '5f18aaeb1b44850502e19bef',
          role: ["user"],
          img: 'img',
          firstName: 'Sashka',
          lastName: 'Bukashka',
          isOnline: false,
          scrollPosition: null
        },
        {
          _id: '5f19c4b2d85814019ad5c246',
          role: ["user"],
          img: 'img',
          firstName: 'Maksimka',
          lastName: 'Botinka',
          isOnline: false,
          scrollPosition: null
        },
      ],
      messages: {
        _id: [{
          user: '',
          userId: '',
          img: '',
          time: 0,
          text: '',
          _id: '',
        }]
      },
    }
  })
  // =================================== AddUser ===================================
  const newUser: UserType = {
    _id: '5f18aaeb1b448506502e19bevnewnewnew',
    role: ["user"],
    img: 'img',
    firstName: 'New',
    lastName: 'User',
    isOnline: true,
    scrollPosition: null
  }
  const oldUserOffLine: UserType = {
    _id: '5f18aaeb1b44850502e19bef',
    role: ["user"],
    img: 'img',
    firstName: 'Sashka',
    lastName: 'Bukashka',
    isOnline: false,
    scrollPosition: null
  }
  const oldUserOnLine: UserType = {
    _id: '5f18ac534b342c000401608a',
    role: ["user", "admin"],
    img: 'img',
    firstName: 'Evgeny',
    lastName: 'Sokov',
    isOnline: true,
    scrollPosition: null
  }
  test('should be added one new user', () => {
    const newState = chatReducer(state, socketActions.AddUser([newUser]))
    expect(newState.users.filter((user: UserType) => user._id === newUser._id)).toContainEqual(newUser)
    expect(newState.users.filter((user: UserType) => user._id === newUser._id).length).toBe(1)
    expect({ ...newState, users: [] }).toEqual({ ...state, users: [] })
  })
  test('isOnline should be true', () => {
    const newState = chatReducer(state, socketActions.AddUser([oldUserOffLine]))
    expect(newState.users.find((user: UserType) => user._id === oldUserOffLine._id)!.isOnline).toBe(true)
    expect(newState.users.filter((user: UserType) => user._id === oldUserOffLine._id).length).toBe(1)
    expect({ ...newState, users: [] }).toEqual({ ...state, users: [] })
  })
  test('nothing should change, adding old user who was in the state with isOnline: true', () => {
    const newState = chatReducer(state, socketActions.AddUser([oldUserOnLine]))
    expect(newState.users.filter((user: UserType) => user._id === oldUserOnLine._id)).toContainEqual(oldUserOnLine)
    expect(newState.users.filter((user: UserType) => user._id === oldUserOnLine._id).length).toBe(1)
    expect(newState).toEqual(state)
  })

  // =================================== updateCurrentChannel ===================================

  const newChannel: ChannelType = {
    _id: 'newChannel',
    name: 'newChannel',
    description: 'newChannel',
    scrollPosition: null,
  }
  test('currentChannel should be newChannel', () => {
    const newState = chatReducer(state, chatActions.updateCurrentChannel(newChannel))
    expect(newState.currentChannel).toEqual(newChannel)
    expect({ ...newState, currentChannel: {} }).toEqual({ ...state, currentChannel: {} })
  })

  // =================================== updateCurrentMessage ===================================

  test('currentChannel should be newChannel', () => {
    const newState = chatReducer(state, chatActions.updateCurrentMessage('ljljffsd'))
    expect(newState.currentMessage).toBe('ljljffsd')
    expect({ ...newState, currentMessage: {} }).toEqual({ ...state, currentMessage: {} })
  })

  // =================================== updateChannelScrollPosition ===================================

  test('currentChannel should be newChannel', () => {
    const newState = chatReducer(state, chatActions.updateChannelScrollPosition('channel 2', 1234))
    expect(newState.channels.find(channel => channel._id === 'channel 2')!.scrollPosition).toBe(1234)
    expect(newState.channels.find(channel => channel._id === 'channel 1')!.scrollPosition).toBe(245)
    expect(newState.channels.find(channel => channel._id === 'channel 3')!.scrollPosition).toBe(null)
    expect({ ...newState, channels: [] }).toEqual({ ...state, channels: [] })
  })

})