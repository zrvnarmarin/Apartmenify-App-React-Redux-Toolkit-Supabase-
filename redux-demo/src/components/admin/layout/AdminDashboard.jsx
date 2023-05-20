import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, getApartmentsStatus, getAllApartments } from '../apartments/apartmentsSlice.js';

const AdminDashboard = () => {
  const dispatch = useDispatch()

  const apartments = useSelector(selectAllApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)

  useEffect(() => {
    dispatch(getAllApartments())
  }, [apartmentsStatus, dispatch])

  return (
    <div className='bg-[#1f1f1f]'>
      <Navbar />
      <Outlet context={{ apartments: apartments }} />
      <h1 className='text-2xl'>ADMIN</h1>
    </div>
  )
}

export default AdminDashboard