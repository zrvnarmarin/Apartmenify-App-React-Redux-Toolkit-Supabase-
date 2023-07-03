import React from 'react'
import { reservationsTableHeaderData } from '../../../data/reservations/reservationsTableHeaderData';

const ReservationTableHeader = () => {
  return (
    <div className='grid-cols-7 hidden md:grid p-2 bg-[#182028] text-[#f5f0f1] text-md font-normal'>
      {reservationsTableHeaderData.map(headerData =>
        <div className='text-[#f5eced] text-lg font-semibold' key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default ReservationTableHeader