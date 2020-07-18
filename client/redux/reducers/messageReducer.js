import { UPDATE_CURRENT_MESSAGE, ADD_MESSAGE, UPDATE_CURRENT_CHANNEL, ADD_CHANNEL } from './types'

const inicialState = {
  currentMessage: '',
  currentChannel: {
    name: '',
    channelId: '',
    description: '',
  },
  channels: [],
  users: [
    {
      isOnline: true,
      firstName: 'Olivia',
      lastName: 'Dunham',
      id: 0,
    },
    {
      isOnline: false,
      firstName: 'Adam',
      lastName: 'Bishop',
      id: 1,
    },
    {
      isOnline: true,
      firstName: 'killgt',
      lastName: undefined,
      id: 2,
    },
  ],
  messages: {
    '123': [
      {
        id: 0,
        img: 'https://avatars2.githubusercontent.com/u/343407?s=460&v=4',
        time: 1594901292339,
        user: 'killgt',
        text: 'The slack from the other side.',
      },
      {
        id: 1,
        img: 'https://i.imgur.com/8Km9tLL.jpg',
        time: 1594901292339,
        user: 'Olivia Dunham',
        text: 'How are we supposed to control the marquee space without an utility for it? I propose this:',
        //         <div className="bg-grey-lighter border border-grey-light font-mono rounded p-3 mt-2 whitespace-pre">.marquee-lightspeed { -webkit-marquee-speed: fast; }
        // .marquee-lightspeeder { -webkit-marquee-speed: faster; }',
      },
      {
        id: 2,
        img: 'https://i.imgur.com/qACoKgY.jpg',
        time: 1594901292339,
        user: 'Adam Bishop',
        text:
          '<a href="#" className="text-blue">@Olivia Dunham</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before it\'s too late!',
      },
    ],
  },
}

const messageReducer = (state = inicialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MESSAGE:
      return { ...state, currentMessage: action.payload }

    case UPDATE_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload }

    case ADD_MESSAGE: {
      const { channelId } = action.payload
      const newMessages =
        typeof state.messages[channelId] === 'undefined'
          ? { ...state.messages, [channelId]: [action.payload] }
          : { ...state.messages, [channelId]: [...state.messages[channelId], action.payload] }
      return { ...state, messages: newMessages }
    }

    case ADD_CHANNEL: {
      console.log('ADD_CHANNEL:', { ...state, channels: action.payload })
      
      return { ...state, channels: action.payload }
}
    default:
      return state
  }
}

export default messageReducer
