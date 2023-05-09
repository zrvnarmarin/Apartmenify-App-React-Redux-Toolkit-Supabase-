import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReservationsByUserEmail, filteredReservationsByBookingStatus, cancelReservation, deleteReservation } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import FilterSection from './FilterSection';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { toast } from 'react-toastify';
import { getApartment, selectAllApartments } from '../../apartmentsSlice';
import UserReservationTableHeader from './UserReservationTableHeader';
import { setCurrentTime as setTime, selectCurrentTime } from '../../timeSlice';
import { format } from 'date-fns';
import { store } from '../../../store/store'
import { current } from '@reduxjs/toolkit';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservationsByBookingStatus)
  const { email } = useSelector(selectUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cancelSelectedReservation = reservationId => dispatch(cancelReservation(reservationId))
  const removeSelectedReservation = reservationId => dispatch(deleteReservation(reservationId))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  useEffect(() => {
    dispatch(getReservationsByUserEmail(email))
  }, [dispatch])

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [currentDate, setCurrentDate] = useState(new Date());
  const [targetDate, setTargetDate] = useState(new Date(currentDate.getTime() + 5000));

  const reservationDate = userReservations.map(res => new Date(res.endDate). getTime())

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (currentDate.getTime() > reservationDate) {
      console.log('Current date is bigger than target date!');
    }
  }, [currentDate, targetDate]);

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl'>
        Reservations
      </h1>
      <h1>CURRENT: {currentDate.toString()}</h1>
      <h1>FUTURE: {userReservations.map(res => new Date(res.endDate)).toString()}</h1>
      <FilterSection />
      <UserReservationTableHeader />
      <div className='flex flex-col gap-2'>
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
                } 
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
                    if (userReservation.status === 'confirmed' || userReservation.status === 'inProgress') {
                      cancelSelectedReservation(userReservation.id)
                      toast.info('Reservation is canceled!')
                    }

                    else if (userReservation.status === 'canceled') {
                      removeSelectedReservation(userReservation.id)
                      toast.info('Reservation is removed!')
                    }

                    else if (userReservation.status === 'finished') {
                      dispatch(getApartment(userReservation.apartmentId))
                    }
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

 // TO DO: 
  // pogledaj zasto funkcija ispod ne zna vratiti userReservation.id
  // const deleteSelectedReservation = reservationId = dispatch(deleteReservation(reservationId))