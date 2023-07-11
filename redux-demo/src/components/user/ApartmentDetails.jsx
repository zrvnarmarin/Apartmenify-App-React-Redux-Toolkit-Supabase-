import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectApartment, getApartment } from '../admin/apartments/apartmentsSlice'
import LocationPin from '../../assets/locationPin.png'
import ReserveApartment from './ReserveApartment';
import { mappedFacilities } from '../../data/facilities/mappedFacilitiesWithIcons';
import RouteContainer from '../admin/layout/RouteContainer.jsx'
import RatingStarFilled from '../../assets/rating_icons/rating_star_filled_icon.png'
import ImageCarousel from '../../UI/Image Carousel/ImageCarousel';
import ImageGalleryModal from '../../UI/Modal/ImageGalleryModal';
import { openModal, selectModalType } from '../../UI/modalSlice';

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
  const openImageGalleryModal = () => dispatch(openModal('image gallery'))
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPreviousSlide = () => {
    const isFirstLside = currentImageIndex === 0
    const newIndex = isFirstLside ? slides.length - 1 : currentImageIndex - 1

    setCurrentImageIndex(newIndex)
  }

  const gotToNextSlide = () => {
    const isLastSlide = currentImageIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1

    setCurrentImageIndex(newIndex)
  }

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

      {/* Image gallery */}
      <div className='block md:hidden'>
        <ImageCarousel slides={slides} />
      </div>

      <div className='grid grid-cols-4 grid-rows-2 gap-2 rounded bg-red-200 relative'>
        {slides.map((slide, slideIndex) =>
          <div 
            key={slide.title} 
            className={`${slide.main === true ? 'col-span-2 row-span-full' : 'col-span-1 row-span-1'} `}
          >
            <img 
              src={slide.url} 
              alt='apartment_image' 
              className={`${slide.main === true ? 'rounded-tl-md rounded-bl-md' : 'border-tl-none'} w-full object-cover h-full`}
            />
          </div>
        )}
        <button 
        onClick={() => {
          openImageGalleryModal()
          console.log(modalType)
        }}
          className='absolute bottom-4 right-4 border-[1px] border-slate-800 bg-white text-slate-800 rounded-lg px-4 py-2 text-sm font-normal shadow-2xl'
        >
          Show All Images
        </button>
      </div>

      {/* Facilities */}
      <div className='flex flex-wrap flex-row gap-1 sm:gap-3'>
        { facilityObjects?.map(facility => 
          <div key={facility.value} className='flex items-center gap-3 border-[1px] border-black py-2 px-3 md:py-3 md:px-5'>
            <img src={facility.iconSrc} width={25} height={25} />
            <span>{facility.value}</span>
          </div>  
        )}
      </div>

      {/* Description */}
      <div>
        {apartment.description}
      </div>

      {/* Reserve apartment section */}
      <ReserveApartment 
        apartmentId={apartmentId} 
        apartmentTitle={apartmentTitle} 
      />

      {/* Image gallery modal */}
      { modalType === 'image gallery' && <ImageGalleryModal /> }
    </RouteContainer>
  )
}

export default ApartmentDetails

