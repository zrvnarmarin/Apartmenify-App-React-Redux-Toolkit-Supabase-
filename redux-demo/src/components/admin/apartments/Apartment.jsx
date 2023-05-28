import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteApartment } from './apartmentsSlice'
import Modal from '../../../UI/Modal'
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice'
import { modalTexts } from '../../../data/modal/modalTexts'
import ArrowImage from '../../../assets/ArrowDown.webp'
import FreeApartmentIcon from '../../../assets/apartment_availability_icons/free.webp'
import OccupiedApartmentIcon from '../../../assets/apartment_availability_icons/occupied.webp'
import ReservedApartmentIcon from '../../../assets/apartment_availability_icons/reserved.webp'

const Apartment = ({ id, tableIndex, title, city, rooms, price, description, address, doubleBeds, singleBeds, distanceFromTheSea, facilities, availability }) => {
  
  const dispatch = useDispatch()

  const [isAvailabilityToolTipShown, setSsAvailabilityToolTipShown] = useState(false)

  const deleteSelectedApartment = () => {
    dispatch(deleteApartment(id))
    toast.success('Apartment deleted!')
  }

  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  const showAvailabilityToolTip = () => setSsAvailabilityToolTipShown(true)
  const hideAvailabilityToolTip = () => setSsAvailabilityToolTipShown(false)
  
  return (
    <>
      <div className='grid grid-cols-7 items-center gap-4 md:gap-0 p-2 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>

        <div className='pl-2 text-[#f5eced] text-xl font-semibold col-span-full md:col-span-1'>
          <span className='inline-block md:hidden'>#</span>
          <span>{tableIndex}</span>
        </div>

        <div className='pl-2 col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Title</span>
            <span className='text-lg font-semibold'>{title}</span>
          </div>
        </div>
        
        <div className='pl-2 flex col-span-full items-start md:col-span-1 relative justify-start md:justify-start'>
          <div className='flex flex-col items-start md:items-start justify-self-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Availability</span>
            <div className='flex items-center gap-2'>
              <img 
                src={ 
                  availability === 'free' 
                  ? FreeApartmentIcon 
                  : availability === 'reserved' 
                  ? ReservedApartmentIcon 
                  : OccupiedApartmentIcon
                } 
                alt="apartment_availability_icon" 
                width={30}
                height={30}
                className={`inline-block`}
                onMouseEnter={showAvailabilityToolTip}
                onMouseLeave={hideAvailabilityToolTip}
              />
              { isAvailabilityToolTipShown 
                ?
                  <span 
                    className='absolute hidden md:block bottom-5 left-10 bg-gradient-to-r from-[#e8132f] to-[#fd3b54] capitalize py-1 px-2 rounded z-10'
                  >
                    {availability}
                  </span>
                : 
                  <></>
              }
              <span className='capitalize md:hidden text-lg font-semibold'>{availability}</span>
            </div>
          </div>
        </div>
        
        <div className='pl-2 col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>City</span>
            <span className='text-lg font-semibold'>{city}</span>
          </div>
        </div>
        
        <div className='pl-2 col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Rooms</span>
            <span className='text-lg font-semibold'>{rooms}</span>
          </div>
        </div>

        <div className='pl-2 col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Price</span>
            <span className='text-lg font-semibold'>{price}e</span>
          </div>
        </div>

        <div className='col-span-full md:col-span-1 justify-self-center'>
          <button
            onClick={toggleMoreDetailsSection}
            className="p-2 bg-[#252525] rounded-full"
          >
            <img
              src={ArrowImage} 
              width={20}
              height={20}
              className={`${!isOpenMoreDetailsSection ? "rotate-180" : ""} duration-300`} 
            />
          </button>
        </div>

        { isOpenMoreDetailsSection &&
          <div className='col-span-full mt-8 bg-[#171717] rounded-md p-2 border-[1px] border-slate-500'>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Description:</p>
              <p>{description}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Address:</p>
              <p>{address}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Double beds:</p>
              <p>{doubleBeds}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Single beds:</p>
              <p>{singleBeds}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Distance from the sea:</p>
              <p>{distanceFromTheSea} km</p>
            </div>
            <div className='flex items-center justify-between pb-4'>
              <p className='text-[#f5eced] text-lg font-semibold pl-2'>Facilities:</p>
              <div className="flex flex-row flex-wrap gap-2 md:gap-8 p-4 md:p-0">
                {facilities.map((facility, i) =>
                  <div key={i} className='flex items-center justify-between gap-2'>
                    <p className="bg-[#252525] hover:bg-gradient-to-r from-[#e8132f] to-[#fd3b54] p-2 rounded-md font-medium">
                      {facility}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className='flex items-center justify-end pt-4 border-t-[1px]'>
              <div className='flex flex-row gap-2'>
              <button className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'>
                <Link 
                  to={`${id}`} 
                  state={{
                    id: id,
                    title: title,
                    city: city,
                    rooms: rooms,
                    price: price,
                    description: description,
                    address: address,
                    singleBeds: singleBeds,
                    doubleBeds: doubleBeds,
                    distanceFromTheSea,
                    facilities: facilities, 
                    availability: availability
                  }}
                >
                  Update
                </Link>
              </button>
                <button
                  onClick={openModalWindow}
                  className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'>Delete</button>
              </div>
            </div>
          </div>
        }
      </div>

      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteApartment} 
          confirmAction={deleteSelectedApartment} 
        />
      }
    </>
  )
}

export default Apartment