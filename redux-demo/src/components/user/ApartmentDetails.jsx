import React, { useEffect } from 'react'
import { selectApartment, getApartment } from '../apartmentsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ApartmentDetails = () => {
  const dispatch = useDispatch()

  const { state: { apartmentId } } = useLocation()
  const apartment = useSelector(selectApartment)
  
  useEffect(() => {
    console.log('details info, ovo je id: ', apartmentId)
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