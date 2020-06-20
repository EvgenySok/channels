import React from 'react'

const TopBar = () => {
  const currentCannel = {
    name: '#general',
    discribe: 'Chit-chattin about ugly HTML and mixing of concerns.',
  }

  return (
    <div>
      <div className="border-b flex px-6 py-2 items-center">
        <div className="flex flex-col">
          <h2 className="text-grey-600 text-md mb-1 font-extrabold">{currentCannel.name}</h2>
          <div className="text-grey font-thin text-sm">{currentCannel.discribe}</div>
        </div>
        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
        </div>
      </div>
    </div>
  )
}
export default TopBar
