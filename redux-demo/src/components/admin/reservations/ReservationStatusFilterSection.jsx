import React, { useState } from 'react'
import { reservationStatusFilterOptions } from '../../../data/reservations/reservationStatusFilterOptions';
import { useDispatch } from 'react-redux';
import { setReservationStatusfilter } from './reservationsSlice';

const ReservationStatusFilterSection = () => {
  const dispatch = useDispatch()

  const setReservationStatusFilter = filter => dispatch(setReservationStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-row items-center justify-start gap-4 px-4'>
      {reservationStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationStatusFilter(option.value)
            setIsActive(option.id)
            // px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]
          }} 
          className={`${isActive === option.id ? 'bg-blue-300' : 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'} px-6 py-2 rounded-md font-medium text-[#f5eced]`}
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default ReservationStatusFilterSection