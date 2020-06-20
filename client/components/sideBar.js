import React from 'react'
import SidebarHeader from './sidebar/sidebarHeader'
import ListCannels from './sidebar/listCannels'
import ListDirectMessages from './sidebar/listDirectMessages'
import UsersName from './sidebar/usersName'

const Sidebar = () => (
  <div className="bg-purple-800 text-purple-300 w-1/5 pb-6 hidden md:block">
    <SidebarHeader />
    <UsersName />
    <div className="px-4 mb-2 font-sans">Channels</div>
    <ListCannels />
    <div className="px-4 mb-3 font-sans">Direct Messages</div>
    <ListDirectMessages />
    <div className="px-4 mb-3 font-sans">Applications</div>
  </div>
)
export default Sidebar
