import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const UpdateReservation = () => {
    const location = useLocation()
    const reservation = location.state

    const [test, setTest] = useState(reservation.apartmentTitle)

  return (
    <div>
        <p className='text-2xl p-2'>Update Reservations</p>
        <p>{reservation.id}</p>
        <p>{reservation.apartmentTitle}</p>
        <input type="text" value={test} onChange={(e) => setTest(e.target.value)} placeholder='Change' />
    </div>
  )
}

export default UpdateReservation