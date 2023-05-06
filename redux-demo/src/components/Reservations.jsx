import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../UI/Loading Spinner/LoadingSpinner'
import { getAllReservations, selectIsLoading, filteredReservations, selectReservationFilter, selectReservationFilterQuery } from './reservationsSlice'
import Reservation from './Reservation'
import ReservationTableHeader from './ReservationTableHeader';
import ReservationStatusFilterSection from './ReservationStatusFilterSection';
import ReservationFilterSection from './ReservationFilterSection'

const Reservations = () => {
  const allReservations = useSelector(filteredReservations)
  const isLoading = useSelector(selectIsLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReservations())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-2xl p-2'>Reservations</p>
      <ReservationFilterSection />
      <ReservationStatusFilterSection />
        <ReservationTableHeader />
        {allReservations.map((reservation, index) => 
          <Reservation
            key={reservation.id}
            index={index + 1}
            id={reservation.id}
            apartmentId={reservation.apartmentId}
            userId={reservation.userId}
            name={reservation.name}
            surname={reservation.surname}
            userEmail={reservation.userEmail}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            apartmentTitle={reservation.apartmentTitle}
            status={reservation.status}
          />  
        )}
    </div>
  )
}

export default Reservations