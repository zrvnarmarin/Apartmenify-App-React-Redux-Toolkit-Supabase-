import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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

  // OVO je memoized selector!
  // const likedApartments = useSelector(getLikedApartments)
  // const isApartmentLiked = (apartmentId) => { return likedApartments.includes(apartmentId) }
  
  useEffect(() => {
    dispatch(getAllWishlists())
  }, []) 

  if (isLoading) return <LoadingSpinner />
  
  return (
    <RouteContainer>
      <FilterSortSection />
      <ApartmentsGrid apartments={filteredAndSortedApartments} />
    </RouteContainer>
  )
}

export default SearcApartments;