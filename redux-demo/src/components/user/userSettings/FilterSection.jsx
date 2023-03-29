import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, selectFilter } from '../../reservationsSlice'
import { filterOptions } from '../../../data/reservations/user/filterOptions'

const FilterSection = () => {
  const dispatch = useDispatch()
  const setReservationFilter = filter => dispatch(setFilter(filter))

  const reservationFilter = useSelector(selectFilter)
  console.log('filter je', reservationFilter)

  const [isActive, setIsActive] = useState(1)

  return (
    <div className='flex flex-row items-center justify-start gap-4 p-2 mb-3 border-black border-[1px] bg-red-100'>
      {filterOptions.map(option => 
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