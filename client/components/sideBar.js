import React from 'react'
import { Link } from 'react-router-dom'
import SidebarHeader from './sidebar/sidebarHeader'
import ChannelsList from './sidebar/channelsList'
import ListDirectMessages from './sidebar/listDirectMessages'
import UsersName from './sidebar/usersName'
import ChannelsTitle from './sidebar/channelsTitle'

const Sidebar = () => (
  <div className="bg-blue-800 text-blue-100 w-1/5 pb-6 hidden md:block">
    <SidebarHeader />
    <UsersName />
    <ChannelsTitle />
    <ChannelsList />
    <div className="px-4 mb-3 font-sans">Direct Messages</div>
    <ListDirectMessages />
    <div className="px-4 mb-3 font-sans">Applications</div>
    <Link to="/login">login </Link>
    <Link to="/secret">secret </Link>
  </div>
)
export default Sidebar
