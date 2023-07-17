import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCountOfApartmentsByFacility } from '../apartments/apartmentsSlice'
import { mappedFacilities } from '../../../data/facilities/mappedFacilitiesWithIcons';

const FacilityFilters = ({ getExistingFacility }) => {
  const [isActive, setIsActive] = useState(0)

  const [existingFacility, setExistingFacility] = useState('')
  const existingFacilityClickHandler = () => setExistingFacility(existingFacility)

  const countOfApartmentsByFacility = useSelector(selectCountOfApartmentsByFacility)

  const facilityObjects = Object.entries(countOfApartmentsByFacility).map(facility => {
    let mappedFacility = mappedFacilities.find(mappedFacility => mappedFacility.value === facility[0]) 

    if (mappedFacility) return { value: mappedFacility.value, iconSrc: mappedFacility.icon, occurences: facility[1] }
  })

  return (
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
              getExistingFacility(facility.value)
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
  )
}

export default FacilityFilters