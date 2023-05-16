import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, getApartmentsStatus, getAllApartments } from './apartmentsSlice';

const MainPage = () => {
  const dispatch = useDispatch()

  const apartments = useSelector(selectAllApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)

  useEffect(() => {
    dispatch(getAllApartments())
  }, [apartmentsStatus, dispatch])

  return (
    <div className='border-black border-[1px] bg-[#1f1f1f]'>
      <Navbar />
      <Outlet context={{ apartments: apartments }} />
      <h1 className='text-2xl'>ADMIN</h1>
    </div>
  )
}

export default MainPage