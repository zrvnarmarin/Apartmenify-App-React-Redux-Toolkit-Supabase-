import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Apartment from './Apartment'
import RouteContainer from '../admin/layout/RouteContainer';
import LoadingSpinner from '../../UI/Loading Spinner/LoadingSpinner';
import { selectIsLoading, selectFilteredAndSortedApartments } from '../admin/apartments/apartmentsSlice';
import FilterSortSection from './apartments/FilterSortSection.jsx';
import { getAllWishlists, getLikedApartments } from '../auth/usersSlice';
import ApartmentsGrid from './apartments/ApartmentsGrid';

const SearcApartments = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)
  // const likedApartments = useSelector(getLikedApartments)
  // const isApartmentLiked = (apartmentId) => { return likedApartments.includes(apartmentId) }
  
  useEffect(() => {
    dispatch(getAllWishlists())
  }, []) 

  if (isLoading) return <LoadingSpinner />
  
  return (
    <RouteContainer>
      <FilterSortSection />
      {/* <p>Liked Apartments:</p>
      {likedApartments.map(id => 
        <div key={id}># {id}</div>  
      )} */}
      {/* <ul className='flex flex-col gap-4'>
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
            // isApartmentLiked={isApartmentLiked}
          />
        )}
      </ul> */}
      <ApartmentsGrid apartments={filteredAndSortedApartments} />
    </RouteContainer>
  )
}

export default SearcApartments;