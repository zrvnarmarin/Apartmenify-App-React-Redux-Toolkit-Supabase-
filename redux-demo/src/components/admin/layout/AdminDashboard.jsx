import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { selectAllApartments, getAllApartments } from '../apartments/apartmentsSlice.js';

const AdminDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllApartments())
  }, [dispatch])

  return (
    <div className='bg-[#0E1217] h-screen font-sans'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AdminDashboard