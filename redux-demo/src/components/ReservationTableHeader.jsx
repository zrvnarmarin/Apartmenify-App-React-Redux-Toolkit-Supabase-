import React from 'react'
import { reservationsTableHeaderData } from './../data/reservations/reservationsTableHeaderData';

const ReservationTableHeader = () => {
  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      {reservationsTableHeaderData.map(headerData =>
        <div key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default ReservationTableHeader