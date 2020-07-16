import React from 'react'
import { Link } from 'react-router-dom'
import SidebarHeader from './sidebarHeader'
import ChannelsList from './channelsList'
import ListDirectMessages from './listDirectMessages'
import UserName from './userName'
import ChannelsTitle from './channelsTitle'

const Sidebar = () => (
  <div className="sidebar">
    <SidebarHeader />
    <UserName />
    <ChannelsTitle />
    <ChannelsList />
    <div className="sidebar__channels-title channels-header">Direct Messages</div>
    <ListDirectMessages />
    <div className="sidebar__channels-title channels-header">Applications</div>
    <Link to="/login">login </Link>
    <Link to="/secret">secret </Link>
  </div>
)
export default Sidebar
