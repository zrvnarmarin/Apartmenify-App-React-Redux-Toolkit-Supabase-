import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Apartment from './Apartment'
import LoadingSpinner from '../../UI/Loading Spinner/LoadingSpinner';
import { getAllApartments, selectIsLoading, selectFilteredAndSortedApartments } from '../apartmentsSlice';
import FilterSortSection from '../FilterSortSection';
import { selectUser, getAllWishlists, selectAllWishlists, getAllSavedApartments, selectAllSavedApartments } from '../auth/usersSlice';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)

  const { id: userId } = useSelector(selectUser)
  const wishlists = useSelector(selectAllWishlists)
  const savedApartments = useSelector(selectAllSavedApartments)

  console.log(savedApartments)

  useEffect(() => {
    dispatch(getAllApartments())
    dispatch(getAllWishlists(userId))
    dispatch(getAllSavedApartments(userId))
  }, [userId])

  if (isLoading) return <LoadingSpinner />
  
  return (
    <div>
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
            wishlists={wishlists}
          />
        )}
      </ul>
    </div>
  )
}

export default SearcApartments;