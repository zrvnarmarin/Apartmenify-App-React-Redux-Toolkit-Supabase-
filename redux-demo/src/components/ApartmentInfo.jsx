import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteApartment } from './apartmentsSlice'
import Modal from '../UI/Modal'
import { openModal, selectIsModalOpen } from '../UI/modalSlice'
import { modalTexts } from '../data/modal/modalTexts'

const ApartmentInfo = ({ id, tableIndex, title, city, rooms, price, description, address, doubleBeds, singleBeds, distanceFromTheSea, facilities, availability }) => {
  
  const dispatch = useDispatch()
  const deleteSelectedApartment = () => dispatch(deleteApartment(id))

  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())
  
  return (
    <>
      <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
        <span>{tableIndex}</span>
        <div>{title}</div>
        <div>{availability}</div>
        <div>{city}</div>
        <div>{rooms}</div>
        <div>{price} e</div>
        <div>
          <button
            onClick={toggleMoreDetailsSection}
            className="p-2 bg-blue-50 border-[1px] border-black"
          >
            { isOpenMoreDetailsSection ? 'Hide Info' : 'More Info'}
          </button>
        </div>
        { isOpenMoreDetailsSection &&
          <div className='col-span-full'>
            <div className='flex items-center justify-between'>
              <p>Description:</p>
              <p>{description}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Address:</p>
              <p>{address}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Double beds:</p>
              <p>{doubleBeds}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Single beds:</p>
              <p>{singleBeds}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Distance from the sea:</p>
              <p>{distanceFromTheSea} km</p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Facilities:</p>
              {facilities.map((facility, i) =>
                <div key={i} className='flex items-center justify-between gap-2'>
                  <p>{facility}</p>
                </div>
              )}
            </div>
            <div className='flex items-center justify-end'>
              <div className='flex flex-row gap-2'>
                <button className="p-2 bg-blue-50 border-[1px] border-black">Change Details</button>
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