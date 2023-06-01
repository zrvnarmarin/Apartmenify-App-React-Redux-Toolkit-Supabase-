import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './layout/Navbar';
import { getUser } from '../auth/usersSlice';

const UserDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div className='p-2 border-black border-[1px]'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default UserDashboard