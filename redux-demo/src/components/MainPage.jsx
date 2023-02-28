import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, getApartmentsStatus, fetchApartments, getExistingFacilityGroups, setExistingFacilityGroups, getAllApartments } from './apartmentsSlice';

const MainPage = () => {
  const dispatch = useDispatch()

  const apartments = useSelector(selectAllApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)

  const existingFacilityGroups = useSelector(getExistingFacilityGroups)

  useEffect(() => {
    dispatch(getAllApartments())
    // if (apartmentsStatus === 'idle') {
    //   dispatch(fetchApartments()).then(() => dispatch(setExistingFacilityGroups('')))
      
    // }
  }, [apartmentsStatus, dispatch])

  console.log(apartments)

  return (
    <div style={{ padding: '5px', border: '1px solid black'}}>
      <Navbar />
      <Outlet context={{ apartments: apartments, existingFacilityGroups: existingFacilityGroups }} />
      Main Page
    </div>
  )
}

export default MainPage