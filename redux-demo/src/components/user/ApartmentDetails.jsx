import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectApartment, getApartment } from '../admin/apartments/apartmentsSlice'
import LocationPin from '../../assets/locationPin.png'
import ReserveApartment from './apartments/reserveApartment/ReserveApartment';
import { mappedFacilities } from '../../data/facilities/mappedFacilitiesWithIcons';
import RouteContainer from '../admin/layout/RouteContainer.jsx'
import ImageCarousel from '../../UI/Image Carousel/ImageCarousel';
import ImageGrid from '../../UI/Image Grid/ImageGrid';
import ImageGalleryModal from '../../UI/Modal/ImageGalleryModal';
import { openModal, selectModalType } from '../../UI/modalSlice';
import ReviewsContainer from './reviews/ReviewsContainer';

const slides = [
  {
    url: 'https://www.myglobalviewpoint.com/wp-content/uploads/2019/03/Neuschwanstein-Castle-Most-Beautiful-Castles-in-the-World.jpg', 
    title: 'fgb',
    main: true
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEtre7ussO6z2K3YzLHHWEtKA9wMtyosTNTYSuIrv-X5jZBJnYsnPagUHbJ9p3h_UpkE&usqp=CAU', 
    title: 'gnbdfg',
    main: false
  },
  {
    url: 'https://hips.hearstapps.com/hmg-prod/images/champagne-beach-espiritu-santo-island-vanuatu-royalty-free-image-1655672510.jpg?crop=1.00xw:0.755xh;0,0.173xh&resize=1200:*', 
    title: 'dghmnfgh',
    main: false
  },
  {
    url: 'https://escales.ponant.com/wp-content/uploads/2020/12/plage.jpg', 
    title: 'xdfhmfj',
    main: false
  },
  {
    url: 'https://www.usnews.com/object/image/00000178-65b2-d6c2-a1fa-e5f2c4c30000/19.+Anse+Source+d%27Argent.jpg?update-time=1616614326561&size=responsiveFlow640', 
    title: 'j',
    main: false
  }
]

const ApartmentDetails = () => {
  const dispatch = useDispatch()

  const modalType = useSelector(selectModalType)

  const apartment = useSelector(selectApartment)
  const { state: { apartmentId, apartmentTitle } } = useLocation()
  console.log(apartment)

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
    <RouteContainer>

      {/*Name and Location*/}
      <div className='flex flex-row flex-wrap gap-8 justify-between'>
        <div className='flex flex-col gap-2 xs:text-start xs:w-auto'>
          <h1 className='first-letter:uppercase text-2xl sm:text-3xl md:text-4xl text-start font-semibold text-slate-800'>{apartment.title}</h1>
          <Link className='w-fit flex items-center gap-2 justify-start xs:justify-start text-gray-500 text-base'>
            <img 
              src={LocationPin} 
              alt="location_pin" 
              className='inline-block' 
              width={25} 
              height={25} 
            />
            <span className='text-lg first-letter:uppercase'>{apartment.address},</span>
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
              <span className='font-semibold ss:text-2xl text-slate-800'>Excellent</span>
              <span className='text-gray-500'>114 reviews</span>
            </p>
            <div className='p-4 rounded-md flex flex-row gap-2 items-center bg-[#FF385C]'>
              <span className='font-light ss:text-2xl text-white'>9.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image carousel */}
      <div className='block md:hidden'>
        <ImageCarousel
          slides={slides} 
          showIndexedDots={true} 
          showImageIndices={false} 
        />
      </div>

      {/* Image grid */}
      <div className='hidden md:block'>
        <ImageGrid slides={slides} />
      </div>

      {/* Facilities */}
      <div className='flex flex-wrap flex-row gap-1 sm:gap-3 text-slate-800'>
        { facilityObjects?.map(facility => 
          <div key={facility.value} className='flex items-center gap-3 border-[1px] border-slate-800 rounded-md py-1 px-3 md:py-2 md:px-5'>
            <img 
              src={facility.iconSrc} 
              width={25} 
              height={25} 
              alt='facility_icon' 
            />
            <span>{facility.value}</span>
          </div>  
        )}
      </div>

      {/* Rooms, beds info and distance from the sea */}
      <div className='flex flex-col xs:flex-row items-start justify-between gap-4'>
        <div>
          <p className='font-semibold text-xl sm:text-3xl text-slate-800'>
            {apartment.rooms} bedrooms
          </p>
          <p className='text-slate-800'>
            {apartment.doubleBeds} double beds &#x2022; {apartment.singleBeds} single beds
          </p>
        </div>

        <div>
          <p className='flex items-center gap-1 font-semibold text-xl sm:text-3xl text-slate-800'>
            <span>{apartment.distanceFromTheSea}</span>
            <span>m</span>
          </p>
          <p className='text-slate-800'>from the the nearest beach</p>
        </div>
      </div>

      {/* Description */}
      <div className='font-medium text-lg sm:text-xl'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor nemo odit temporibus animi a accusantium quod quas vel ducimus, eveniet, accusamus sed, explicabo eligendi sit fugit repudiandae assumenda nobis esse?
      </div>

      <hr />

      {/* Reviews and reserve apartment sections */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {/* Reviews */}
        <ReviewsContainer />

        {/* Reserve apartment section */}
        <ReserveApartment 
          apartmentId={apartmentId} 
          apartmentTitle={apartmentTitle} 
          apartmentPrice={apartment.price}
        />
      </div>

      {/* Image gallery modal */}
      { modalType === 'image gallery' && <ImageGalleryModal slides={slides} /> }
    </RouteContainer>
  )
}

export default ApartmentDetails

