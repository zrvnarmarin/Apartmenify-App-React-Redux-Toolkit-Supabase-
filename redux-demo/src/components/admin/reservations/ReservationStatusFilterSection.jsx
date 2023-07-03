import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setReservationStatusfilter } from './reservationsSlice';
import { reservationStatusFilterOptions } from '../../../data/reservations/reservationStatusFilterOptions';

const ReservationStatusFilterSection = () => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(1)

  const setReservationStatusFilter = filter => dispatch(setReservationStatusfilter(filter))

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-0 ss:gap-4 py-4 sm:py-0'>
      {reservationStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationStatusFilter(option.value)
            setIsActive(option.id)
          }} 
          className={`${isActive === option.id ? 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]' : 'bg-[#121212]' } 
            w-full  text-[#f5eced] px-6 py-2 my-4 ss:my-0 text-lg font-medium drop
            ${option.value === 'Confirmed'  ? 'bg-[#38C786]' : option.value === 'In Progress' ? 'bg-[#F4BA40]' : option.value === 'Finished' ? 'bg-[#4E9DEF]' : 'bg-[#ED5E49]'}
          `}
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default ReservationStatusFilterSection