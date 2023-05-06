import React from 'react'
import { userReservationsTableHeaderData } from '../../../data/reservations/user/userReservationsTableHeaderData'

const UserReservationTableHeader = () => {
  return (
    <div className='grid grid-cols-5 p-2 border-[1px] border-black'>
      {userReservationsTableHeaderData.map(headerData =>
        <div key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default UserReservationTableHeader