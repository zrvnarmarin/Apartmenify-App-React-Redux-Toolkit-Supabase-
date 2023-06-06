import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReservationsByUserEmail, filteredReservationsByBookingStatus, cancelReservation, deleteReservation, getReservationsByApartmentId, selectTestReservations, updateReservationStatus, selectBookingStatusFilter } from '../../admin/reservations/reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import BookingStatusFilter from './BookingStatusFilter.jsx';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { toast } from 'react-toastify';
import { getApartment } from '../../admin/apartments/apartmentsSlice';
import UserReservationTableHeader from './UserReservationTableHeader';
import { format } from 'date-fns';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservationsByBookingStatus)
  const testReservations = useSelector(selectTestReservations)
  const { email } = useSelector(selectUser)
  const bookingStatusFilter = useSelector(selectBookingStatusFilter)

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

  // Timer 
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  function trackReservationsStatuses() {

    if (bookingStatusFilter === 'Current') {
      const confirmedReservations = userReservations.filter(res => res.status === 'confirmed')
      const inProgressReservations = userReservations.filter(res => res.status === 'inProgress')

      confirmedReservations.forEach(res => {
        if (currentDate.getTime() < new Date(res.startDate).getTime()) {
          console.log(`Reservation with ID ${res.id} will occur in the future at ${format(new Date(res.startDate), 'dd.MM.yyyy')}`)
        }

        if (currentDate.getTime() > new Date(res.startDate).getTime()) {
          dispatch(updateReservationStatus({ reservationId: res.id, reservationStatus: 'inProgress'}))
          console.log(`Updated reservation ${res.id} status from confirmed to inProgress!`)
        }
      })

      inProgressReservations.forEach(res => {
        if (currentDate.getTime() > new Date(res.startDate).getTime() && currentDate.getTime() < new Date(res.endDate).getTime()) {
          console.log(`Reservation with ID ${res.id} is currently in occuring!`)
        }
        if (currentDate.getTime() > new Date(res.endDate).getTime()) {
          dispatch(updateReservationStatus({ reservationId: res.id, reservationStatus: 'finished'}))
          console.log(`Reservation with ID ${res.id} status from inProgress to finished!`)
        }
      })
    }

    if (bookingStatusFilter === 'Previous') {
      const finishedReservations = userReservations.filter(res => res.status === 'finished')

      finishedReservations.forEach(res => {
        console.log(res)
      })
    }

    if (bookingStatusFilter === 'Canceled') {
      const canceledReservations = userReservations.filter(res => res.status === 'canceled')

      canceledReservations.forEach(res => {
        console.log(res)
      })
    }
  }

  useEffect(() => {
    trackReservationsStatuses();
  }, [currentDate, bookingStatusFilter, userReservations])
  
  
  return (
    <div className='flex flex-col gap-6 px-6 py-12 bg-[#1F1F1F] text-[#f4eff0]'>
      <h1 className='text-3xl font-semibold text-[#f4eff0] text-center ss:text-left'>Reservations</h1>
      <h1>CURRENT: {currentDate.toString()}</h1>
      <BookingStatusFilter />
      { userReservations.length !== 0 ? <UserReservationTableHeader /> : <></>}
      <div className='flex flex-col gap-2'>
        { 
          userReservations.length === 0 
          ? <h1>No Reservations Available</h1> 
          : userReservations.map((userReservation, i) =>
            <div key={userReservation.id} className='grid grid-cols-[repeat(auto-fit,minmax(200px, 1fr))] sm:grid-cols-5 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal p-2 items-center'>
              <p>{i} {userReservation.status}</p>
              <p>{userReservation.apartmentTitle}</p>
              <p>{userReservation.startDate}</p>
              <p>{userReservation.endDate}</p> 
              <button 
                onClick={openModalWindow}
                className='z-10 px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
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
      <div className='flex flex-col gap-2'>RESERVATION END DATES: {userReservations.map((res, i) => <p className='border-black border-[1px] bg-red-300' key={i}>{new Date(res.endDate).toString()} APARTMENT ID: {res.apartmentId} RESERVATION ID: {res.id}</p> )}</div>
    </div>
  )
}

export default UserReservations

 // TO DO: 
  // pogledaj zasto funkcija ispod ne zna vratiti userReservation.id
  // const deleteSelectedReservation = reservationId = dispatch(deleteReservation(reservationId))