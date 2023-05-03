import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReservationsByUserEmail, filteredReservations, cancelReservation, deleteReservation } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import FilterSection from './FilterSection';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { toast } from 'react-toastify';
import { getApartment } from '../../apartmentsSlice';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservations)
  const { email } = useSelector(selectUser)

  const navigate = useNavigate()

  console.log(userReservations)

  const dispatch = useDispatch()
  // TO DO: 
  // pogledaj zasto funkcija ispod ne zna vratiti userReservation.id
  // const deleteSelectedReservation = reservationId = dispatch(deleteReservation(reservationId))

  const cancelSelectedReservation = reservationId => dispatch(cancelReservation(reservationId))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  useEffect(() => {
    dispatch(getReservationsByUserEmail(email))
  }, [dispatch])

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
            status: <span>{userReservation.status}</span>
            <button 
              onClick={openModalWindow}
              className={`p-2 border-[1px] border-black bg-blue-100`}
            >
              { 
                userReservation.status === 'confirmed' || userReservation.status === 'inProgress' 
                ? 'Cancel'

                : userReservation.status === 'finished' 
                // zasto apartmentId ne radi ovdje - TO DO - link na apartman koji je user vec rezervirao 
                ? <Link to={`/userDashboard/apartments/${userReservation.apartmentId}`}>Reserve Again</Link> 
                
                : userReservation.status === 'canceled'
                ? 'Remove'
                : ''
              }
              {userReservation.apartmentId}
            </button>
            { 
              isModalOpen && 
              <Modal 
                modalText={
                  userReservation.status === 'confirmed' || userReservation.status === 'inProgress' 
                  ? modalTexts.cancelCurrentReservation 
                  : modalTexts.removeReservation
                } 
                confirmAction={() => {
                  if (userReservation.status === 'confirmed' || userReservation.status === 'inProgress') 
                    cancelSelectedReservation(userReservation.id)

                  else if (userReservation.status === 'canceled') 
                    dispatch(deleteReservation(userReservation.id))

                  else if (userReservation.status === 'finished') 
                    dispatch(getApartment(userReservation.apartmentId))
                  
                    toast.info('Reservation is canceled!')
                }} 
              />
            }
          </div>  
        )}
      </div>

    </div>
  )
}

export default UserReservations