import React from 'react'
import ReservationTableHeader from './ReservationTableHeader'
import Reservation from './Reservation'

const ReservationTable = ({ reservations }) => {
  return (
    <div>
      <ReservationTableHeader />
      {reservations.map((reservation, index) => 
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

export default ReservationTable