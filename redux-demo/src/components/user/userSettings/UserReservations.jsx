import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReservationsByUserEmail, filteredReservationsByBookingStatus, cancelReservation, deleteReservation, selectCurrentDate } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import FilterSection from './FilterSection';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { toast } from 'react-toastify';
import { getApartment } from '../../apartmentsSlice';
import UserReservationTableHeader from './UserReservationTableHeader';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservationsByBookingStatus)
  const { email } = useSelector(selectUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentDate = useSelector(selectCurrentDate)

  console.log('Current date:', currentDate)
  console.log('all REservations: ', userReservations)

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
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl'>
        Reservations
      </h1>
      <FilterSection />
      <UserReservationTableHeader />
      <div >
        { 
          userReservations.length === 0 
          ? <h1>No reservations</h1> 
          : userReservations.map((userReservation, i) =>
          <div key={userReservation.id} className='grid grid-cols-5 border-[1px] border-black p-2 items-center'>
            <p>{i}</p>
            <p>{userReservation.apartmentTitle}</p>
            <p>{userReservation.startDate}</p>
            <p>{userReservation.endDate}</p> 
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
              } {userReservation.apartmentId}
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