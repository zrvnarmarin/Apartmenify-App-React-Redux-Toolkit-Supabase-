import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'

const UserDashboard = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid black'}}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default UserDashboard