import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Apartment from './Apartment'
import LoadingSpinner from '../../UI/Loading Spinner/LoadingSpinner';
import { selectAllApartments, getAllApartments, selectIsLoading } from '../apartmentsSlice';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const apartments = useSelector(selectAllApartments)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(getAllApartments())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />

  return (
    <ul className='grid grid-cols-2 gap-4'>
      { apartments.map(apartment => 
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