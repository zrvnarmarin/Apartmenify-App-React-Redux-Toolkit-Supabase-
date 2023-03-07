import React from 'react'
import Apartment from './Apartment'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, getAllApartments } from '../apartmentsSlice';
import { useEffect, useMemo } from 'react';
import { getApartmentsStatus } from './../apartmentsSlice';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const apartments = useSelector(selectAllApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)

  useEffect(() => {
    dispatch(getAllApartments())
  }, [dispatch])

  return (
    <ul className='grid grid-cols-2 gap-4'>
      {apartments.map(apartment => 
        <Apartment
          id={apartment.id}
          key={apartment.id} 
          title={apartment.title}
          description={apartment.description}
          city={apartment.city}
          rooms={apartment.rooms}
          price={apartment.price}
        />
      )}
    </ul>
  )
}

export default SearcApartments;