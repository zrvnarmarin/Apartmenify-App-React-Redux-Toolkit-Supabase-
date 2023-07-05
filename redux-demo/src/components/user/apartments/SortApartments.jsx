import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSort, getSortOrder, setSort, setSortOrder } from '../../admin/apartments/apartmentsSlice'
import { sortOptions } from '../../../data/apartments/sortOptions'
import { sortOrderOptions } from '../../../data/apartments/sortOrderOptions'

const SortApartments = () => {
  const dispatch = useDispatch()

  const sort = useSelector(getSort)
  const sortOrder = useSelector(getSortOrder)
  const sortChangeHandler = e => dispatch(setSort(e.target.value))
  const sortOrderChangeHandler = e => dispatch(setSortOrder(e.target.value))
  
  return (
    <div className='flex flex-wrap gap-6'>
        <div className='flex flex-row gap-4 items-center'>
          <label className='text-[#9e9a9b] text-md font-semibold' htmlFor="sort">Sort by: </label>
          <select
            value={sort}
            onChange={sortChangeHandler}
            id='sort'
            className='shadow-lg rounded-full bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
          >
            {sortOptions.map(option =>
              <option key={option}>{option}</option>
            )}
          </select>
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <label className='text-[#9e9a9b] text-md font-semibold' htmlFor="sortOrder">Sort order: </label>
          <select
            value={sortOrder}
            onChange={sortOrderChangeHandler}
            id='sort'
            className='shadow-lg rounded-full bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
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