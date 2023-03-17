import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, getFilter, getFilterQuery, setFilterQuery, setSort, getSort, setSortOrder, getSortOrder } from './apartmentsSlice'
import { filterOptions } from '../data/apartments/filterOptions'
import { sortOptions } from '../data/apartments/sortOptions'
import { sortOrderOptions } from '../data/apartments/sortOrderOptions'

const FilterSortSection = () => {
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
    <div className='p-2 border-[1px] border-black bg-red-100 flex flex-wrap justify-between items-center'>
      {/* Filter section */}
      <div className='flex flex-wrap gap-6 items-center'>
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select
            value={filter}
            onChange={filterChangeHandler}
            id='filter'
            className='bg-blue-50 border-[1px] border-black outline-none'
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
            className='border-[1px] border-black p-1'
          />
        </div>
      </div>
        
      {/* Sort section */}
      <div className='flex flex-wrap gap-6 items-center'>
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select
            value={sort}
            onChange={sortChangeHandler}
            id='sort'
            className='bg-blue-50 border-[1px] border-black outline-none'
          >
            {sortOptions.map(option =>
              <option key={option}>{option}</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder">Sort order: </label>
          <select
            value={sortOrder}
            onChange={sortOrderChangeHandler}
            id='sort'
            className='bg-blue-50 border-[1px] border-black outline-none'
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

export default FilterSortSection