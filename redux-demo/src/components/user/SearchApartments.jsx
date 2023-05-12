import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Apartment from './Apartment'
import LoadingSpinner from '../../UI/Loading Spinner/LoadingSpinner';
import { getAllApartments, selectIsLoading, selectFilteredAndSortedApartments } from '../apartmentsSlice';
import FilterSortSection from '../FilterSortSection';
import { selectUser, getAllWishlists, selectAllWishlists, getAllSavedApartments, selectAllSavedApartments, getUser } from '../auth/usersSlice';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)

  const wishlists = useSelector(selectAllWishlists)
  const savedApartments = useSelector(selectAllSavedApartments)

  useEffect(() => {
    dispatch(getAllApartments())
    dispatch(getAllSavedApartments())
    dispatch(getAllWishlists())
  }, [])

  if (isLoading) return <LoadingSpinner />
  
  return (
    <div>
      {/* SAVED APARTMENTS: {JSON.stringify(savedApartments)} */}
      <FilterSortSection />
      <ul className='flex flex-col gap-4 p-2 border-black border-[1px] mt-2'>
        { filteredAndSortedApartments.map(apartment =>
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
    </div>
  )
}

export default SearcApartments;