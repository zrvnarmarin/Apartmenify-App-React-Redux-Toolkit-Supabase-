import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, getApartmentsStatus, getAllApartments } from '../apartments/apartmentsSlice.js';

const AdminDashboard = () => {
  const dispatch = useDispatch()

  const apartments = useSelector(selectAllApartments)

  useEffect(() => {
    dispatch(getAllApartments())
  }, [dispatch])

  return (
    <div className='bg-[#0E1217] h-screen font-sans'>
      <Navbar />
      <Outlet context={{ apartments: apartments }} />
    </div>
  )
}

export default AdminDashboard