import React, { useState } from 'react'
import { reservationStatusFilterOptions } from './../data/reservations/reservationStatusFilterOptions';
import { useDispatch } from 'react-redux';
import { setReservationStatusfilter } from './reservationsSlice';

const ReservationStatusFilterSection = () => {
  const dispatch = useDispatch()

  const setReservationStatusFilter = filter => dispatch(setReservationStatusfilter(filter))
  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-row items-center justify-start gap-4 p-2 border-black border-[1px]'>
      {reservationStatusFilterOptions.map(option => 
        <button
          key={option.id}
          onClick={() => {
            setReservationStatusFilter(option.value)
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

export default ReservationStatusFilterSection