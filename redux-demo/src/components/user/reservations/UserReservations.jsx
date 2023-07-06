import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { getReservationsByUserId, filteredReservationsByBookingStatus, cancelReservation, deleteReservation, updateReservationStatus, selectBookingStatusFilter } from '../../admin/reservations/reservationsSlice';
import { selectUser } from '../../auth/usersSlice';
import BookingStatusFilter from './BookingStatusFilter.jsx';
import Modal from '../../../UI/Modal';
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice';
import { modalTexts } from '../../../data/modal/modalTexts';
import { getApartment } from '../../admin/apartments/apartmentsSlice';
import RouteContainer from '../../admin/layout/RouteContainer';

const UserReservations = () => {
  const userReservations = useSelector(filteredReservationsByBookingStatus)
  const { id } = useSelector(selectUser)
  const bookingStatusFilter = useSelector(selectBookingStatusFilter)
  console.log()

  const dispatch = useDispatch()

  const cancelSelectedReservation = reservationId => dispatch(cancelReservation(reservationId))
  const removeSelectedReservation = reservationId => dispatch(deleteReservation(reservationId))

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  useEffect(() => {
    dispatch(getReservationsByUserId(id))
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
    <RouteContainer>
      <h1 className='text-3xl font-semibold text-slate-700 text-center ss:text-left'>Reservations</h1>
      {/* <h1>CURRENT: {currentDate.toString()}</h1> */}
      <BookingStatusFilter />
      { userReservations.length === 0 && <h1 className='text-2xl font-semibold text-slate-800 text-start'>No Reservations Available</h1> }

      <div className='flex flex-col gap-4'>
        { 
          userReservations.map((userReservation, i) =>
            <div 
              key={userReservation.id} 
              className='grid grid-cols-[repeat(auto-fit,minmax(200px, 1fr))] sm:grid-cols-4 hover:bg-slate-100 rounded-md
              text-slate-800 text-md font-normal py-2 px-4 md:py-8 md:px-16 shadow-lg border-[1px] border-slate-200 items-center gap-4'
            >
              {/* <p>{i} {userReservation.status}</p> */}
              <p className='font-semibold text-2xl text-center sm:text-start'>{userReservation.apartmentTitle}</p>
              <p className='flex flex-col gap-2 items-center justify-center'>
                <span className='font-semibold text-lg'>Start Date:</span>
                <span className='text-center text-lg'>{userReservation.startDate}</span>
              </p>
              <p className='flex flex-col gap-2 items-center justify-center'>
                <span className='font-semibold text-lg'>End Date:</span>
                <span className='text-center text-lg'>{userReservation.endDate}</span>
              </p>
              <button 
                onClick={openModalWindow}
                className={`bg-[#FF385C] z-10 drop-shadow-xl w-full text-white rounded-lg px-4 py-2 text-lg font-semibold shadow-2x`}
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

      {/* Test kod end dates za rezervacije */}
      {/* <div className='flex flex-col gap-2'>RESERVATION END DATES: {userReservations.map((res, i) => <p className='border-black border-[1px] bg-red-300' key={i}>{new Date(res.endDate).toString()} APARTMENT ID: {res.apartmentId} RESERVATION ID: {res.id}</p> )}</div> */}
    </RouteContainer>
  )
}

export default UserReservations

 // TO DO: 
  // pogledaj zasto funkcija ispod ne zna vratiti userReservation.id
  // const deleteSelectedReservation = reservationId = dispatch(deleteReservation(reservationId))