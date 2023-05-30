import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBookingStatusfilter } from '../../admin/reservations/reservationsSlice'
import { bookingStatusFilterOptions } from '../../../data/reservations/user/bookingStatusFilterOptions';

const FilterSection = () => {
  const dispatch = useDispatch()

  const setReservationFilter = filter => dispatch(setBookingStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-row items-center justify-start gap-4 p-2 border-black border-[1px]'>
      {bookingStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationFilter(option.value)
            setIsActive(option.id)
          }} 
          className={`${isActive === option.id ? 'bg-blue-300' : 'bg-blue-100'} p-2 border-[1px] border-black`}
        >
          {option.value} reservations
        </button>    
      )}
    </div>
  )
}

export default FilterSection