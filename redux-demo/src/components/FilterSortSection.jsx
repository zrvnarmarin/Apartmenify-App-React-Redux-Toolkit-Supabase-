import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort, getSort, setSortOrder, getSortOrder, setFilter, getFilter, getFilterOptions, getFilterQuery, setFilterQuery } from './apartmentsSlice'

const FilterSortSection = () => {
  const dispatch = useDispatch()

  const sortOptions = [
    { label: 'Id', value: 'id'},
    { label: 'Price', value: 'price'},
    { label: 'Rooms', value: 'rooms'}
  ]

  const filterOptions = useSelector(getFilterOptions)
  const filter = useSelector(getFilter)
  const filterQuery = useSelector(getFilterQuery)
  const filterChangeHandler = e => dispatch(setFilter(e.target.value))
  const filterQueryChangeHandler = e => dispatch(setFilterQuery(e.target.value))

  return (
    <div style={{ padding: '5px', border: '1px solid red'}}>
      <label htmlFor="filter">Filter by: </label>
      <select value={filter} onChange={filterChangeHandler} id='filter'>
        {filterOptions.map(option =>
          <option key={option.label}>{option.label}</option>  
        )}
      </select>
      <input 
        value={filterQuery} 
        onChange={filterQueryChangeHandler}
        type="text" 
        placeholder='Enter filter value...' 
        className='border-[1px] border-black p-1'
      /> 
        
      <br />

    </div>
  )
}

export default FilterSortSection