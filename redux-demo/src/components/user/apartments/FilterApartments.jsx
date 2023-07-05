import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFilter, getFilterQuery, setFilter, setFilterQuery } from '../../admin/apartments/apartmentsSlice'
import { filterOptions } from '../../../data/apartments/filterOptions'

const FilterApartment = () => {
  const dispatch = useDispatch()

  const filter = useSelector(getFilter)
  const filterQuery = useSelector(getFilterQuery)
  
  const filterChangeHandler = e => dispatch(setFilter(e.target.value))
  const filterQueryChangeHandler = e => dispatch(setFilterQuery(e.target.value))

  return (
    <div className='flex flex-wrap gap-6 items-center'>
      <div className='flex flex-row gap-4 items-center'>
        <label className='text-[#9e9a9b] text-md font-semibold' htmlFor="filter">Filter by: </label>
        <select
          value={filter}
          onChange={filterChangeHandler}
          id='filter'
          className='shadow-xl rounded-full bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
        >
          {filterOptions.map(option =>
            <option key={option}>{option}</option>
          )}
        </select>
      </div>

      { filter !== 'All' 
        ?
          <div>
            <input
              value={filterQuery}
              onChange={filterQueryChangeHandler}
              type="text"
              placeholder='Enter filter value...'
              className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 outline-none border-[1px] border-slate-600'
            />
          </div>
        : 
          <></>
      }
    </div>
  )
}

export default FilterApartment