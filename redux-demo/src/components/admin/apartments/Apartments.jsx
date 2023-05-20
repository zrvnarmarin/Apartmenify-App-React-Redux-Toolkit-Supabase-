import React from 'react'
import { useSelector } from 'react-redux'
import ApartmentFilterSortSection from './ApartmentFilterSortSection.jsx.jsx'
import ApartmentTable from './ApartmentTable.jsx'
import { selectFilteredAndSortedApartments } from './apartmentsSlice'
import RouteContainer from '../layout/RouteContainer.jsx'
import ApartmentsHeader from './ApartmentsHeader.jsx'

const Apartments = () => {
  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)

  return (
    <RouteContainer>
      <ApartmentsHeader />
      <ApartmentFilterSortSection />
      <ApartmentTable apartments={filteredAndSortedApartments} /> 
    </RouteContainer>
  )
}

export default Apartments