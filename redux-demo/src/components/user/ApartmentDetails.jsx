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
    <div className='border-[1px] border-black px-6 py-12'>

      {/* Location*/}
      <div className='flex flex-row flex-wrap gap-4 justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='first-letter:uppercase text-4xl'>{apartment.title}</h1>
          <div className='flex items-center gap-2'>
            <img src={LocationPin} alt="location_pin" className='inline-block' width={25} height={25} />
            <span className='text-lg first-letter:uppercase'>{apartment.address}, </span>
            <span className='text-lg first-letter:uppercase'>{apartment.city}</span>
          </div>
          <div>
            <button className='w-font-semibold text-md text-blue-600 hover:underline'>Show Map</button>
          </div>
        </div>

        {/* Rating */}
        <div className='flex gap-4'>
          <div className='flex justify-center items-center gap-4'>
            <p className='flex flex-col'>
              <span className='font-semibold'>Excellent</span>
              <span className='text-gray-500'>114 reviews</span>
            </p>
            <span className='p-4 bg-blue-600 text-white rounded-md'>9.3</span>
          </div>
        </div>
      </div>

      {/* Images gallery grid */}
      {/* <div className='grid grid-cols-3 py-4 gap-4'>
        <div className='col-span-1 flex flex-col gap-4'>
          <img src={Placeholder} className='w-full h-full' width={260} height={260} alt="" />
          <img src={Placeholder} className='w-full h-full' width={260} height={260} alt="" />
        </div>

        <div className='col-span-2'>
          <img src={Placeholder} className='h-full object-cover' alt="" />
        </div>
      </div> */}

      
<div class="grid gap-4">
    <div className='grid grid-cols-2'>
        <div>
          <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
          <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
        </div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
    </div>
    <div class="grid grid-cols-5 gap-4">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
        </div>
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

      <div>
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