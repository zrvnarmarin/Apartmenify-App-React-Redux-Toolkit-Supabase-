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
import { getApartment } from '../../apartmentsSlice';
import UserReservationTableHeader from './UserReservationTableHeader';
import { setCurrentTime as setTime, selectCurrentTime } from '../../timeSlice';

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

  const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime, setTargetTime] = useState(new Date(currentTime.getTime() + 10000));
  const [timer, setTimer] = useState(null);

  const current = useSelector(selectCurrentTime);

  useEffect(() => {
    const newTimer = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      dispatch(setTime(newTime.toString()));
    }, 1000);
    setTimer(newTimer);
    return () => clearInterval(newTimer);
  }, [dispatch]);

  useEffect(() => {
    if (currentTime >= targetTime) {
      setTargetTime(new Date(targetTime.getTime() + 10000)); // increase targetTime by 10 seconds
    }
  }, [currentTime, targetTime]);

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl'>
        Reservations
      </h1>
      <h1>CURRENT: {current}</h1>
      <h1>FUTURE: {targetTime.toString()}</h1>
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