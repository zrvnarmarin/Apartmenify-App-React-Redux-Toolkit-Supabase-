import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Apartment from './Apartment'
import LoadingSpinner from '../../UI/Loading Spinner/LoadingSpinner';
import { getAllApartments, selectIsLoading, selectFilteredAndSortedApartments } from '../admin/apartments/apartmentsSlice';
import FilterSortSection from '../admin/apartments/filterSort/FilterSortSection.jsx';
import { selectUser, getAllWishlists, selectAllWishlists, getUser, getLikedApartments } from '../auth/usersSlice';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)
  const likedApartments = useSelector(getLikedApartments)
  
  useEffect(() => {
    dispatch(getAllApartments())
    dispatch(getAllWishlists())
  }, []) 

  const isApartmentLiked = (apartmentId) => {
    return likedApartments.includes(apartmentId)
  }

  if (isLoading) return <LoadingSpinner />
  
  return (
    <div>
      <FilterSortSection />
      <p>Liked Apartments:</p>
      {likedApartments.map(id => 
        <div key={id}># {id}</div>  
      )}
      <ul className='flex flex-col gap-4 p-2 border-black border-[1px] mt-2 font-poppins'>
        { filteredAndSortedApartments.map(apartment =>
          <Apartment
            id={apartment.id}
            key={apartment.id}
            title={apartment.title}
            description={apartment.description}
            city={apartment.city}
            rooms={apartment.rooms}
            price={apartment.price}
            singleBeds={apartment.singleBeds}
            doubleBeds={apartment.doubleBeds}
            isApartmentLiked={isApartmentLiked}
          />
        )}
      </ul>
    </div>
  )
}

export default SearcApartments;