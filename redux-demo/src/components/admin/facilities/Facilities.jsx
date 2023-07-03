import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountOfApartmentsByFacility, selectApartmentsByFacility } from '../apartments/apartmentsSlice';
import ApartmentTable from '../apartments/ApartmentTable';
import { mappedFacilities } from '../../../data/facilities/mappedFacilitiesWithIcons';
import RouteContainer from '../layout/RouteContainer';
import FacilitiesHeader from './FacilitiesHeader';

const Facilities = () => {
  const dispatch = useDispatch()

  const [isActive, setIsActive] = useState(0)

  const [existingFacility, setExistingFacility] = useState('')
  const existingFacilityClickHandler = existingFacility => setExistingFacility(existingFacility)

  const countOfApartmentsByFacility = useSelector(selectCountOfApartmentsByFacility)
  const apartmentsByFacility = useSelector(selectApartmentsByFacility(existingFacility))

  const facilityObjects = Object.entries(countOfApartmentsByFacility).map(facility => {
    let mappedFacility = mappedFacilities.find(mappedFacility => mappedFacility.value === facility[0]) 

    if (mappedFacility) {
      return { value: mappedFacility.value, iconSrc: mappedFacility.icon, occurences: facility[1] }
    }
  })

  return (
    <RouteContainer>
      <FacilitiesHeader />

      <div className='flex flex-row flex-wrap gap-4 justify-center xs:justify-start'>
  {facilityObjects.map((facility, i) => (
    <div 
      key={facility.value} 
      className={`flex-grow ${isActive === i + 1 ? 'bg-[#0C768A]' : 'bg-[#182028]'} px-6 py-2 font-medium text-[#f5eced]`}
    >
      <button 
        onClick={() => {
          setIsActive(i + 1)
          existingFacilityClickHandler(facility.value)
        }}
        className='flex items-center justify-center gap-4  w-full'
      >
        <img 
          src={facility.iconSrc} 
          alt="facility_icon" 
          className='bg-white p-1 rounded-full inline-block' 
          width={30}
          height={30}
        />
        <span>{facility.value}</span>
        <span className='rounded-full ml-2 px-3 py-1 text-black bg-white'>{facility.occurences}</span>
      </button>
    </div>
  ))}
</div>


      <ApartmentTable apartments={apartmentsByFacility} />
    </RouteContainer>
  )
}

export default Facilities
