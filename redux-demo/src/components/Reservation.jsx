import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsModalOpen, openModal } from '../UI/modalSlice'
import { modalTexts } from '../data/modal/modalTexts'
import { deleteReservation } from './reservationsSlice'
import Modal from '../UI/Modal'

const Reservation = ({ index, id, name, surname, startDate, endDate, apartmentTitle, apartmentId, userId, userEmail, status }) => {

  const dispatch = useDispatch()
  const deleteSelectedReservation = () => dispatch(deleteReservation(id))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  return (
    <div className='grid grid-cols-8 p-2 gap-4 items-center rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal mx-4'>
      <p>{index}</p>
      <p>#{id}</p>
      <p>{status}</p>
      <p>{apartmentTitle}</p>
      <p>{`${name} ${surname}`}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <div className='flex flex-row gap-2'>
          <button 
            onClick={openModalWindow} 
            className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
          >
            Delete
          </button>
          { status === 'confirmed' || status === 'inProgress'
            ? 
              <button className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'>
                <Link 
                  to={`${id}`} 
                  state={{ index: index, id: id, userId: userId, userEmail: userEmail, name: name, surname: surname, startDate: startDate, endDate: endDate, apartmentId: apartmentId, apartmentTitle: apartmentTitle, status: status }}
                >
                  Update
                </Link>
              </button>
            : 
              <></>
          }
        </div>

      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteReservation} 
          confirmAction={deleteSelectedReservation} 
        />
      }

    </div>
  )
}

export default Reservation