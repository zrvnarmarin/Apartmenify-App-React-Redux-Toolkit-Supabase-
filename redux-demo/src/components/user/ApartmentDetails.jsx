import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectApartment, getApartment } from '../admin/apartments/apartmentsSlice'
import LocationPin from '../../assets/locationPin.webp'
import Placeholder from '../../assets/placeholder.webp'
import ReserveApartment from './ReserveApartment';
import { mappedFacilities } from '../../data/facilities/mappedFacilitiesWithIcons';

const ApartmentDetails = () => {
  const dispatch = useDispatch()

  const apartment = useSelector(selectApartment)
  const { state: { apartmentId, apartmentTitle } } = useLocation()

  const facilityObjects = apartment.facilities?.map(facility => {
    let mappedFacility = mappedFacilities.find(mappedFacility => mappedFacility.value === facility) 

    if (mappedFacility) {
      return { 
        value: mappedFacility.value, 
        iconSrc: mappedFacility.icon 
      }
    }
  })

  useEffect(() => {
    dispatch(getApartment(apartmentId))
  }, [dispatch])  

  return (
    <div className='border-[1px] border-black xs:px-2 xs:py-4 md:px-6 md:py-12'>

      {/*Name and Location*/}
      <div className='flex flex-row flex-wrap gap-4 justify-between bg-green-200'>
        <div className='flex flex-col gap-2 text-center xs:text-start bg-red-400 w-full xs:w-auto'>
          <h1 className='first-letter:uppercase text-4xl'>{apartment.title} dfgvsdf dfgvs dfgv dg</h1>
          <div className='flex items-center gap-2 justify-center xs:justify-start bg-blue-300'>
            <div>
              <img src={LocationPin} alt="location_pin" className='inline-block' width={25} height={25} />
              <span className='text-lg first-letter:uppercase'>{apartment.address}, </span>
            </div>
            <span className='text-lg first-letter:uppercase'>{apartment.city}</span>
          </div>
          <div>
            <button className='w-font-semibold text-md text-blue-600 hover:underline'>Show Map</button>
          </div>
        </div>

        {/* Rating */}
        <div className='flex gap-4 bg-yellow-300 w-full xs:w-auto'>
          <div className='flex justify-between items-center gap-4 w-full'>
            <p className='flex flex-col'>
              <span className='font-semibold'>Excellent</span>
              <span className='text-gray-500'>114 reviews</span>
            </p>
            <span className='p-4 bg-blue-600 text-white rounded-md'>9.3</span>
          </div>
        </div>
      </div>

      {/* Imges grid */}
      <div className='grid grid-cols-6 py-4'>
        <div className='flex gap-2 col-start-1 col-end-4 p-1 bg-red-400'>
          <img src={Placeholder} alt="" className='' />
        </div>
        <div className='flex gap-2 col-start-4 col-end-7 p-1 bg-red-400'>
          <img src={Placeholder} alt="" className='' />
        </div>

        <div className='flex gap-2 col-start-1 col-end-3 p-1 bg-red-400'>
          <img src={Placeholder} alt="" className='' />
        </div>
        <div className='flex gap-2 col-start-3 col-end-5 p-1 bg-red-400'>
          <img src={Placeholder} alt="" className='' />
        </div>
        <div className='flex gap-2 col-start-5 col-end-7 p-1 bg-red-400'>
          <img src={Placeholder} alt="" className='' />
        </div>
      </div>

      {/* Facilities */}
      <div className='flex flex-wrap flex-row gap-4'>
        { facilityObjects?.map(facility => 
          <div key={facility.value} className='flex gap-2 items-center border-[1px] border-black py-4 px-6'>
            <img src={facility.iconSrc} width={25} height={25} />
            <span>{facility.value}</span>
          </div>  
        )}
      </div>

      <div className='py-4'>
        {apartment.description}
      </div>

      <ReserveApartment 
        apartmentId={apartmentId} 
        apartmentTitle={apartmentTitle} 
      />

    </div>
  )
}

export default ApartmentDetails