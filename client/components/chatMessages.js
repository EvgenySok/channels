import React from 'react'

const ChatMessages = () => {
  const messages = [
    {
      id: 0,
      img: 'https://avatars2.githubusercontent.com/u/343407?s=460&v=4',
      time: '11:46',
      name: 'killgt',
      text: 'The slack from the other side.',
    },
    {
      id: 1,
      img: 'https://i.imgur.com/8Km9tLL.jpg',
      time: '12:45',
      name: 'Olivia Dunham',
      text: 'How are we supposed to control the marquee space without an utility for it? I propose this:',
      //         <div className="bg-grey-lighter border border-grey-light font-mono rounded p-3 mt-2 whitespace-pre">.marquee-lightspeed { -webkit-marquee-speed: fast; }
      // .marquee-lightspeeder { -webkit-marquee-speed: faster; }',
    },
    {
      id: 2,
      img: 'https://i.imgur.com/qACoKgY.jpg',
      time: '12:46',
      name: 'Adam Bishop',
      text:
        '<a href="#" className="text-blue">@Olivia Dunham</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before it\'s too late!',
    },
  ]
  return (
    <div>
      {messages.map((message) => (
        <div className="flex items-start mb-4" key={message.id}>
          <img src={message.img} className="w-10 h-10 rounded mr-3" alt={message.name} />
          <div className="flex flex-col">
            <div className="flex items-end">
              <span className="font-bold text-md mr-2 font-sans">{message.name}</span>
              <span className="text-grey text-xs font-light">{message.time}</span>
            </div>
            <p className="font-light text-md text-grey-darkest pt-1">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ChatMessages
