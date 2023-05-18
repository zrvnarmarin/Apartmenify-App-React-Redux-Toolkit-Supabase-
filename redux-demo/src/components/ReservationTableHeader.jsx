import React from 'react'
import { reservationsTableHeaderData } from './../data/reservations/reservationsTableHeaderData';

const ReservationTableHeader = () => {
  return (
    <div className='grid grid-cols-8 p-2 mx-4 rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>
      {reservationsTableHeaderData.map(headerData =>
        <div className='text-[#f5eced] text-lg font-semibold pl-2' key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default ReservationTableHeader