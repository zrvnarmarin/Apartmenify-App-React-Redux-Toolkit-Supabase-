import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReservationsByUserEmail, filteredReservationsByBookingStatus, cancelReservation, deleteReservation, getReservationsByApartmentId, selectTestReservations } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import FilterSection from './FilterSection';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { toast } from 'react-toastify';
import { getApartment, updateApartmentAvailability } from '../../apartmentsSlice';
import UserReservationTableHeader from './UserReservationTableHeader';
import { format } from 'date-fns';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservationsByBookingStatus)
  const testReservations = useSelector(selectTestReservations)
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

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {

    userReservations.map(res => {
      const startDateTime = new Date(res.startDate).getTime()
      const endDateTime = new Date(res.endDate).getTime()

      // If the current date is bigger than the reservations`s end date, and there is no more reservations on that apartment,
      // then the apartment`s availability is free
      if (currentDate.getTime() > endDateTime) {
        console.log(`current date is bigger than reservation end dateTime -- apartment ${res.apartmentId} is now free again `)
        // dispatch(getReservationsByApartmentId(res.apartmentId))
        dispatch(updateApartmentAvailability({ apartmentId: res.apartmentId, availability: 'free'}))
        return
      }

      // If the current date is between the reservation`s start and end dates, then the apartment`s availability is occupied
      if (currentDate.getTime() > startDateTime && currentDate < endDateTime) {
        console.log(`apartment with ID ${res.apartmentId} is currently occupied!`)
        dispatch(updateApartmentAvailability({ apartmentId: res.apartmentId, availability: 'occupied'}))
      }

      // console.log(currentDate.getTime() > endDateTime)
    })

    // console.log(testReservations)

  }, [currentDate]);

  useEffect(() => {
    userReservations.map(res => {
      console.log('change')
    })
  }, [userReservations])

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl'>
        Reservations
      </h1>
      <h1>CURRENT: {currentDate.toString()}</h1>
      <div className='flex flex-col gap-2'>RESERVATION END DATES: {userReservations.map((res, i) => <p className='border-black border-[1px] bg-red-300' key={i}>{new Date(res.endDate).toString()} APARTMENT ID: {res.apartmentId}</p> )}</div>
      <FilterSection />
      <UserReservationTableHeader />
      <div className='flex flex-col gap-2'>
        { 
          userReservations.length === 0 
          ? <h1>No reservations</h1> 
          : userReservations.map((userReservation, i) =>
            <div key={userReservation.id} className='grid grid-cols-5 border-[1px] border-black p-2 items-center'>
              <p>{i} {userReservation.status}</p>
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