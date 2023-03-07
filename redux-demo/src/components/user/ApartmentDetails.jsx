import React, { useEffect } from 'react'
import { selectApartment, getApartment } from '../apartmentsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ApartmentDetails = () => {
  const { state: { apartmentId } } = useLocation()
  const dispatch = useDispatch()
  const apartment = useSelector(selectApartment)
  
  useEffect(() => {
    console.log('details')
    console.log(apartmentId)
    dispatch(getApartment(apartmentId))
    console.log(apartment)
  }, [])  

  return (
    <div>
        Apartments Details
    </div>
  )
}

export default ApartmentDetails