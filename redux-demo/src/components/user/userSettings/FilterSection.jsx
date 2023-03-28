import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../reservationsSlice'
import { filterOptions } from '../../../data/reservations/user/filterOptions'

const FilterSection = () => {
  const dispatch = useDispatch()
  const setReservationFilter = filter => dispatch(setFilter(filter))

  return (
    <div className='flex flex-row items-center justify-end gap-4'>
        {filterOptions.map(option => 
            <button
                key={option.id}
                onClick={() => setReservationFilter(option.value)} 
                className='p-2 border-[1px] border-black bg-blue-50'
            >
                {option.value} reservations
            </button>    
        )}
    </div>
  )
}

export default FilterSection