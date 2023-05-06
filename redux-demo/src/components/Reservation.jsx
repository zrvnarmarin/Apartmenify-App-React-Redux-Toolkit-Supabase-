import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsModalOpen, openModal } from '../UI/modalSlice'
import { modalTexts } from '../data/modal/modalTexts'
import { deleteReservation } from './reservationsSlice'
import Modal from '../UI/Modal'

const Reservation = ({ index, id, name, surname, startDate, endDate, apartmentTitle, userId, userEmail, status }) => {
  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  const dispatch = useDispatch()
  const deleteSelectedReservation = () => dispatch(deleteReservation(id))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  return (
    <div className='grid grid-cols-8 p-2 border-[1px] border-black items-center'>
      <p>{index}</p>
      <p>#{id}</p>
      <p>{status}</p>
      <p>{apartmentTitle}</p>
      <p>{`${name} ${surname}`}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <button 
        onClick={toggleMoreDetailsSection} 
        className='p-2 border-[1px] border-black bg-blue-100'
      >
        { isOpenMoreDetailsSection ? 'Close' : 'Manage'}
      </button>

      { isOpenMoreDetailsSection && 
        <div>
          <button onClick={openModalWindow} className='p-2 border-[1px] border-black bg-blue-100'>Delete</button>
          <button className='p-2 border-[1px] border-black bg-blue-100'>
          <Link 
            to={`${id}`} 
            state={{ index: index, id: id, userId: userId, userEmail: userEmail, name: name, surname: surname, startDate: startDate, endDate: endDate, apartmentTitle: apartmentTitle}}
          >
          Update
        </Link>
          </button>
        </div>
      }

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