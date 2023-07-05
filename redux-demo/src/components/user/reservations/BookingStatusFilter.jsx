import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBookingStatusfilter } from '../../admin/reservations/reservationsSlice'
import { bookingStatusFilterOptions } from '../../../data/reservations/user/bookingStatusFilterOptions';

const FilterSection = () => {
  const dispatch = useDispatch()

  const setReservationFilter = filter => dispatch(setBookingStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-0 ss:gap-4 py-4 sm:py-0'>
      {bookingStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationFilter(option.value)
            setIsActive(option.id)
          }} 
          className={`${isActive === option.id ? 'bg-[#ff5e7b]' : 'bg-[#FF385C]'} z-10 drop-shadow-xl w-full text-white rounded-lg px-4 py-2 text-lg font-semibold shadow-2x`}
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default FilterSection