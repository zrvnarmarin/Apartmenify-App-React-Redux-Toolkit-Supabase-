import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsByUserEmail, filteredReservations, deleteReservation } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import FilterSection from './FilterSection';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { Link } from 'react-router-dom';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservations)
  const { email } = useSelector(selectUser)

  const dispatch = useDispatch()
  const deleteSelectedReservation = reservationId => dispatch(deleteReservation(reservationId))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  useEffect(() => {
    dispatch(getReservationsByUserEmail(email))
  }, [dispatch])

  // if (userReservations.length === 0) return <div>
  //   <h1>No reservations</h1>
  //   <Link>Find Your stay</Link>
  // </div>

  return (
    <div>
      <FilterSection />
      <div className='flex flex-col gap-3'>
        { 
          userReservations.length === 0 
          ? <h1>No reservations</h1> 
          : userReservations.map(userReservation =>
          <div key={userReservation.id} className='border-[1px] border-black p-2'>
            start time: <span>{userReservation.startDate}</span>, 
            end time: <span>{userReservation.endDate}</span>, 
            apartment id: <span>{userReservation.apartmentId}</span>, 
            apartment name: <span>{userReservation.apartmentTitle}</span>, 
            is finished reservation : <span>{(userReservation.isCompleted.toString())}</span>
            <button 
              onClick={openModalWindow}
              className='p-2 border-[1px] border-black bg-blue-100'
            >
              { userReservation.isCompleted ? 'Remove' : 'Cancel'}
            </button>
            { 
              isModalOpen && 
              <Modal 
                modalText={modalTexts.cancelCurrentReservation} 
                confirmAction={() => deleteSelectedReservation(userReservation.id)} 
              />
            }
          </div>  
        )}
      </div>

    </div>
  )
}

export default UserReservations