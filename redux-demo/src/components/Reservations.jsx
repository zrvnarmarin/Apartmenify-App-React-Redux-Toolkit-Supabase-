import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../UI/Loading Spinner/LoadingSpinner'
import { getAllReservations, selectAllReservations, selectIsLoading } from './reservationsSlice'
import Reservation from './Reservation'
import ReservationTableHeader from './ReservationTableHeader';

const Reservations = () => {
  const allReservations = useSelector(selectAllReservations)
  const isLoading = useSelector(selectIsLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReservations())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-2xl p-2'>Reservations</p>
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
          />  
        )}
    </div>
  )
}

export default Reservations