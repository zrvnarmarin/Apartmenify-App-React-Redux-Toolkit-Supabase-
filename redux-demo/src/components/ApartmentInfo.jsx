import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteApartment } from './apartmentsSlice'
import Modal from '../UI/Modal'
import { openModal, selectIsModalOpen } from '../UI/modalSlice'
import { modalTexts } from '../data/modal/modalTexts'
import ArrowImage from '../assets/icons8-double-down-50.webp'
import { cancelReservation } from './reservationsSlice';

const ApartmentInfo = ({ id, tableIndex, title, city, rooms, price, description, address, doubleBeds, singleBeds, distanceFromTheSea, facilities, availability }) => {
  
  const dispatch = useDispatch()
  const deleteSelectedApartment = () => dispatch(deleteApartment(id))

  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())
  
  return (
    <>
      <div className='grid grid-cols-7 items-center p-2 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>
        <span>{tableIndex}</span>
        <div>{title}</div>
        <div>{availability}</div>
        <div>{city}</div>
        <div>{rooms}</div>
        <div>{price} e</div>
        <div className='justify-self-center'>
          <button
            onClick={toggleMoreDetailsSection}
            className="p-2 bg-[#252525] rounded-full"
          >
            <img
              src={ArrowImage} 
              width={20}
              height={20}
              className={`${!isOpenMoreDetailsSection ? "rotate-180" : ""}`} 
            />
          </button>
        </div>
        { isOpenMoreDetailsSection &&
          <div className='col-span-full'>
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
            <div className='flex items-center justify-between'>
              <p className='text-[#f5eced] text-lg font-semibold pl-2'>Facilities:</p>
              <div className="flex flex-row gap-8">
                {facilities.map((facility, i) =>
                  <div key={i} className='flex items-center justify-between gap-2'>
                    <p className="bg-[#252525] p-2 rounded-md">{facility}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='flex items-center justify-end'>
              <div className='flex flex-row gap-2'>
              <button className='p-2 border-[1px] border-black bg-blue-100'>
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
                  className="p-2 bg-blue-50 border-[1px] border-black">Delete</button>
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

export default ApartmentInfo