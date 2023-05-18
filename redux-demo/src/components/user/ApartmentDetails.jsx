import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectApartment, getApartment } from '../admin/apartments/apartmentsSlice'
import LocationPin from '../../assets/locationPin.png'
import Placeholder from '../../assets/placeholder.webp'
import ReserveApartment from './ReserveApartment';

const ApartmentDetails = () => {
  const dispatch = useDispatch()

  // TO DO: radi na ovaj hacky nacin, ali kako dohvatiti onda apartmentTitle - to 
  const { state: { apartmentId, apartmentTitle } } = useLocation()
  const apartment = useSelector(selectApartment)
  const { title, address, city, facilities } = apartment
  // const apartmentId =  useLocation().pathname.substring(useLocation().pathname.lastIndexOf('/') + 1)
  // console.log(apartmentId)

  useEffect(() => {
    dispatch(getApartment(apartmentId))
  }, [dispatch])  

  return (
    <div className='border-[1px] border-black px-10'>

      <div className='flex flex-row flex-wrap gap-4 justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='first-letter:uppercase text-4xl'>{title}</h1>
          <div className='flex items-center gap-2'>
            <img src={LocationPin} alt="location_pin" className='inline-block' width={25} height={25} />
            <span>{address}, {city}</span>
          </div>
          <div>
            <button className='w-font-semibold text-md text-blue-600 hover:underline'>Show Map</button>
          </div>
        </div>

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

      <div className='grid grid-cols-3 py-4 gap-4'>
        <div className='col-span-1 flex flex-col gap-4'>
          <img src={Placeholder} className='w-full h-full' width={260} height={260} alt="" />
          <img src={Placeholder} className='w-full h-full' width={260} height={260} alt="" />
        </div>

        <div className='col-span-2'>
          <img src={Placeholder} className='h-full object-cover' alt="" />
        </div>
      </div>

      <div className='flex flex-wrap flex-row gap-4'>
        { facilities?.map(facility => 
          <div key={facility} className='flex gap-2 items-center border-[1px] border-black py-4 px-6'>
            <img src={Placeholder} width={25} height={25} />
            <span>{facility}</span>
          </div>  
        )}
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nisi nulla laboriosam maxime eum excepturi dicta similique repellendus ipsum provident, aliquid blanditiis recusandae. Voluptates, dolor eligendi debitis consectetur odit porro.
        At fugiat ducimus, voluptates qui blanditiis aperiam, corporis beatae modi eum alias in veritatis error officia odit cum tempore ex voluptate exercitationem voluptas explicabo labore nemo laborum similique. Facilis, neque?
      </div>

      <ReserveApartment 
        apartmentId={apartmentId} 
        apartmentTitle={apartmentTitle} 
      />

    </div>
  )
}

export default ApartmentDetails