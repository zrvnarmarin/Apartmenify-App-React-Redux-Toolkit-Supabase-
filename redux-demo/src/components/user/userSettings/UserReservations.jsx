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

  const [isDispatched, setIsDispatched] = useState(false)

  useEffect(() => {
    const endDates = userReservations.map(res => new Date(res.endDate).getTime())
    const someEndDatesExpired = endDates.some(endDateTime => currentDate.getTime() > endDateTime)
    const everyEndDatesExpired = endDates.every(endDateTime => currentDate.getTime() > endDateTime)
  
    console.log('Every date expired: ', everyEndDatesExpired.toString().toUpperCase())
    console.log('Some date expired: ', someEndDatesExpired.toString().toUpperCase())
    console.log(userReservations)
  
    if (someEndDatesExpired && !isDispatched) {
      setIsDispatched(true);
      const expiredApartments = userReservations.filter(res => currentDate.getTime() > new Date(res.endDate).getTime())
      expiredApartments.forEach(expiredRes => {
        console.log(`Apartment with ID ${expiredRes.apartmentId} (${expiredRes.apartmentTitle}) is expired!`)
        const remainingReservations = userReservations.filter(res => res.apartmentId === expiredRes.apartmentId && currentDate.getTime() <= new Date(res.endDate).getTime())
        console.log(`There are ${remainingReservations.length} reservations left for apartment with ID ${expiredRes.apartmentId}.`)
      })
      const apartmentReservations = userReservations.reduce((acc, res) => {
        acc[res.apartmentId] = (acc[res.apartmentId] || 0) + 1
        return acc
      }, {})
      const multiResApartments = Object.entries(apartmentReservations).filter(([_, count]) => count > 1)
      multiResApartments.forEach(([apartmentId, count]) => {
        console.log(`Apartment with ID ${apartmentId} has ${count} reservations!`)
        const remainingReservations = userReservations.filter(res => res.apartmentId === apartmentId && currentDate.getTime() <= new Date(res.endDate).getTime())
        console.log(`There are ${remainingReservations.length} reservations left for apartment with ID ${apartmentId}.`)
      })
    }
  }, [currentDate]);
  
  
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