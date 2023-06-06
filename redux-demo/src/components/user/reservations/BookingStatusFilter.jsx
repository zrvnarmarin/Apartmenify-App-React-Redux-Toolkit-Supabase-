import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBookingStatusfilter } from '../../admin/reservations/reservationsSlice'
import { bookingStatusFilterOptions } from '../../../data/reservations/user/bookingStatusFilterOptions';

const FilterSection = () => {
  const dispatch = useDispatch()

  const setReservationFilter = filter => dispatch(setBookingStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-row flex-wrap items-center justify-start gap-4 p-2 border-black border-[1px]'>
      {bookingStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationFilter(option.value)
            setIsActive(option.id)
          }} 
          className={`${isActive === option.id ? 'bg-gradient-to-r from-[#3ed81f] to-[#0ec53c]' : 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'} z-10 px-6 py-2 rounded-md font-medium text-[#f5eced]`}
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default FilterSection