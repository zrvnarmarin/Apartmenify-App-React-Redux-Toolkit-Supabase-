import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid black'}}>
        <Navbar />
        <Outlet />
      User Main Page
    </div>
  )
}

export default UserDashboard