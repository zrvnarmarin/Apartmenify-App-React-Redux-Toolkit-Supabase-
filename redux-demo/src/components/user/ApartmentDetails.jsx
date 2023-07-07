import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectApartment, getApartment } from '../admin/apartments/apartmentsSlice'
import LocationPin from '../../assets/locationPin.png'
import Placeholder from '../../assets/placeholder.webp'
import ReserveApartment from './ReserveApartment';
import { mappedFacilities } from '../../data/facilities/mappedFacilitiesWithIcons';
import RouteContainer from '../admin/layout/RouteContainer.jsx'
import RatingStarFilled from '../../assets/rating_icons/rating_star_filled_icon.png'
import Imageslider from '../../UI/Image Carousel/Imageslider';

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

  const slides = [
    {
      url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
      title: 'nesto'
    },
    {
      url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
      title: 'nesto'
    },
    {
      url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
      title: 'nesto'
    },
    {
      url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
      title: 'nesto'
    },
    {
      url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
      title: 'nesto'
    }
  ]

  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto'
  }

  return (
    <RouteContainer>

      {/*Name and Location*/}
      <div className='flex flex-row flex-wrap gap-4 justify-between'>
        <div className='flex flex-col gap-2 xs:text-start xs:w-auto'>
          <h1 className='first-letter:uppercase text-2xl md:text-4xl text-start font-semibold'>{apartment.title}</h1>
          <Link className='w-fit flex items-center gap-2 justify-start xs:justify-start text-gray-500 text-base'>
            <img src={LocationPin} alt="location_pin" className='inline-block' width={25} height={25} />
            <span className='text-lg first-letter:uppercase'>{apartment.address}, </span>
            <span className='text-lg first-letter:uppercase'>{apartment.city}</span>
          </Link>
          <Link 
            className='w-fit underline underline-offset-4 decoration-[#FF385C] text-[#FF385C] rounded-md w-ful 
            text-start text-lg font-medium'
          >
            Show Map
          </Link>
        </div>
        
        {/* Rating */}
        <div className='flex gap-4 w-full xs:w-auto border-[1px] border-[#FF385C] xs:border-none p-1 rounded-md'>
          <div className='flex justify-between items-center gap-4 w-full'>
            <p className='flex flex-col'>
              <span className='font-semibold ss:text-2xl'>Excellent</span>
              <span className='text-gray-500'>114 reviews</span>
            </p>
            <div className='p-4 rounded-md flex flex-row gap-2 items-center'>
              <span className='text-base ss:text-2xl text-slate-800'>9.3</span>
              <img src={RatingStarFilled} alt="rating_star_icon" width={15} height={15} className='pb-1' />
            </div>
          </div>
        </div>
      </div>

      {/* Imges grid
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
      </div> */}

      <div style={containerStyles}>
        <Imageslider slides={slides} />
      </div>

      {/* Facilities */}
      <div className='flex flex-wrap flex-row gap-1 sm:gap-3'>
        { facilityObjects?.map(facility => 
          <div key={facility.value} className='flex items-center border-[1px] border-black py-2 px-3 md:py-3 md:px-5'>
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

    </RouteContainer>
  )
}

export default ApartmentDetails

