import React from 'react'
import { userReservationsTableHeaderData } from '../../../data/reservations/user/userReservationsTableHeaderData'

const UserReservationTableHeader = () => {
  return (
    <div className='grid grid-cols-5 p-2 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>
      {userReservationsTableHeaderData.map(headerData =>
        <div key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default UserReservationTableHeader