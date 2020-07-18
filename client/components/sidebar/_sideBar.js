import React from 'react'
import { Link } from 'react-router-dom'
import SidebarHeader from './sidebarHeader'
import ChannelsList from './channelsList'
import UsersList from './usersList'
import UserName from './userName'
import ChannelsTitle from './channelsTitle'

const Sidebar = () => (
  <div className="sidebar">
    <SidebarHeader />
    <UserName />
    <ChannelsTitle />
    <ChannelsList />
    <div className="sidebar__channels-title channels-header">Direct Messages</div>
    <UsersList />
    <div className="sidebar__channels-title channels-header">Applications</div>
    <Link to="/login">login </Link>
    <Link to="/secret">secret </Link>
  </div>
)
export default Sidebar
