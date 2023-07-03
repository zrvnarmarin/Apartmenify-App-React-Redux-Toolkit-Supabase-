import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import RouteContainer from '../layout/RouteContainer';
import ApartmentTable from '../apartments/ApartmentTable';
import FacilitiesHeader from './FacilitiesHeader';
import FacilityFilters from './FacilityFilters';
import { selectApartmentsByFacility } from '../apartments/apartmentsSlice';

const Facilities = () => {
  const [existingFacility, setExistingFacility] = useState('')
  const getExistingFacility = existingFacility => setExistingFacility(existingFacility)

  const apartmentsByFacility = useSelector(selectApartmentsByFacility(existingFacility))

  return (
    <RouteContainer>
      <FacilitiesHeader />
      <FacilityFilters getExistingFacility={getExistingFacility} />
      <ApartmentTable apartments={apartmentsByFacility} />
    </RouteContainer>
  )
}

export default Facilities
