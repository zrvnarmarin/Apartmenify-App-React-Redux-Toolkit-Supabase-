import React, { useState } from 'react'
import { reservationStatusFilterOptions } from '../../../data/reservations/reservationStatusFilterOptions';
import { useDispatch } from 'react-redux';
import { setReservationStatusfilter } from './reservationsSlice';

const ReservationStatusFilterSection = () => {
  const dispatch = useDispatch()

  const setReservationStatusFilter = filter => dispatch(setReservationStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-col sm:flex-row items-center justify-start gap-0 ss:gap-4 px-4 py-4 sm:py-0'>
      {reservationStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationStatusFilter(option.value)
            setIsActive(option.id)
            // px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]
          }} 
          className={`${isActive === option.id ? 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]' : 'bg-[#121212]' } w-full sm:w-fit text-[#f5eced] px-6 py-2 my-4 ss:my-0 rounded-md text-lg font-medium drop`}
          
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default ReservationStatusFilterSection