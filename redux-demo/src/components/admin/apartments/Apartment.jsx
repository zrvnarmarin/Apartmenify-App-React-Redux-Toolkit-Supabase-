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
      <div className='grid grid-cols-7 items-center p-2 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>
        <span className='pl-2 text-[#f5eced] text-lg font-semibold'>{tableIndex}</span>
        <div className='pl-2'>{title}</div>
        
        <div className={`pl-2 flex gap-2 items-center relative`}>
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
                className='absolute bottom-5 left-10 bg-gradient-to-r from-[#e8132f] to-[#fd3b54] capitalize py-1 px-2 rounded z-10'
              >
                {availability}
              </span>
            : 
              <></>
          }
        </div>
        <div className='pl-2'>{city}</div>
        <div className='pl-2'>{rooms}</div>
        <div className='pl-2'>{price} e</div>
        <div className='justify-self-center'>
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
          <div className='col-span-full mt-8'>
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
              <div className="flex flex-row gap-8">
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