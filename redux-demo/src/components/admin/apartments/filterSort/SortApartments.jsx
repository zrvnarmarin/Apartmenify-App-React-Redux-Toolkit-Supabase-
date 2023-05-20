import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSort, getSortOrder, setSort, setSortOrder } from '../apartmentsSlice'
import { sortOptions } from '../../../../data/apartments/sortOptions'
import { sortOrderOptions } from '../../../../data/apartments/sortOrderOptions'

const SortApartments = () => {
  const dispatch = useDispatch()

  const sort = useSelector(getSort)
  const sortOrder = useSelector(getSortOrder)
  const sortChangeHandler = e => dispatch(setSort(e.target.value))
  const sortOrderChangeHandler = e => dispatch(setSortOrder(e.target.value))
  
  return (
    <div className='flex flex-wrap gap-6'>
        <div className='flex flex-row gap-4 items-center'>
          <label className='text-[#9e9a9b] text-lg font-semibold' htmlFor="sort">Sort by: </label>
          <select
            value={sort}
            onChange={sortChangeHandler}
            id='sort'
            className='bg-[#252525] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
          >
            {sortOptions.map(option =>
              <option key={option}>{option}</option>
            )}
          </select>
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <label className='text-[#9e9a9b] text-lg font-semibold' htmlFor="sortOrder">Sort order: </label>
          <select
            value={sortOrder}
            onChange={sortOrderChangeHandler}
            id='sort'
            className='bg-[#252525] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
          >
            {sortOrderOptions.map(option =>
              <option key={option}>{option}</option>
            )}
          </select>
        </div>

      </div>
  )
}

export default SortApartments