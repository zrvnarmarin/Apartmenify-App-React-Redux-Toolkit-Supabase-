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
    <div style={{ padding: '5px', border: '1px solid black'}}>
      <Navbar />
      <Outlet context={{ apartments: apartments }} />
      Main Page
    </div>
  )
}

export default MainPage