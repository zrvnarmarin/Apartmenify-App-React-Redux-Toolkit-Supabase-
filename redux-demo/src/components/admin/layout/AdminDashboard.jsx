import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar.jsx';
import { getAllApartments } from '../apartments/apartmentsSlice.js';

const AdminDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllApartments())
  }, [])

  return (
    <div className='bg-[#0E1217] h-screen font-sans'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AdminDashboard