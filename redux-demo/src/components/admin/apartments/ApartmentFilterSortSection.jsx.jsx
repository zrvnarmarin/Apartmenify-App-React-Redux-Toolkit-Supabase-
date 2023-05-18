import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, getFilter, getFilterQuery, setFilterQuery, setSort, getSort, setSortOrder, getSortOrder } from './apartmentsSlice'
import { filterOptions } from '../../../data/apartments/filterOptions'
import { sortOptions } from '../../../data/apartments/sortOptions'
import { sortOrderOptions } from '../../../data/apartments/sortOrderOptions'

const ApartmentFilterSortSection = () => {
  const dispatch = useDispatch()

  const filter = useSelector(getFilter)
  const filterQuery = useSelector(getFilterQuery)
  const filterChangeHandler = e => dispatch(setFilter(e.target.value))
  const filterQueryChangeHandler = e => dispatch(setFilterQuery(e.target.value))

  const sort = useSelector(getSort)
  const sortOrder = useSelector(getSortOrder)
  const sortChangeHandler = e => dispatch(setSort(e.target.value))
  const sortOrderChangeHandler = e => dispatch(setSortOrder(e.target.value))

  return (
    <div className='p-2 bg-[#121212] rounded-md flex flex-wrap justify-between items-center gap-4'>
      {/* Filter section */}
      <div className='flex flex-wrap gap-6 items-center'>
        <div className='flex flex-row gap-4 items-center'>
          <label className='text-[#9e9a9b] text-lg font-semibold' htmlFor="filter">Filter by: </label>
          <select
            value={filter}
            onChange={filterChangeHandler}
            id='filter'
            className='bg-[#252525] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
          >
            {filterOptions.map(option =>
              <option key={option}>{option}</option>
            )}
          </select>
        </div>

        <div>
          <input
            value={filterQuery}
            onChange={filterQueryChangeHandler}
            type="text"
            placeholder='Enter filter value...'
            className='bg-[#252525] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
          />
        </div>
      </div>
        
      {/* Sort section */}
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
    </div>
  )
}

export default ApartmentFilterSortSection