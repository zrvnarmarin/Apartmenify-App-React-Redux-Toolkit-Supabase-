import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort, getSort, setSortOrder, getSortOrder, getSortOptions, setFilter, getFilter, getFilterOptions, getFilterQuery, setFilterQuery } from './apartmentsSlice'

const FilterSortSection = ({ sortOrder, onSortOrderChange }) => {
  const dispatch = useDispatch()

  const sort = useSelector(getSort)
  const sortOptions = useSelector(getSortOptions)
  const sortChangeHandler = e => dispatch(setSort(e.target.value))

  const filterOptions = useSelector(getFilterOptions)
  const filter = useSelector(getFilter)
  const filterQuery = useSelector(getFilterQuery)
  const filterChangeHandler = e => dispatch(setFilter(e.target.value))
  const filterQueryChangeHandler = e => dispatch(setFilterQuery(e.target.value))

  console.log(sort)


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

      <label htmlFor="sort">Sort by: </label>
      <select value={sort} onChange={sortChangeHandler} id='filter'>
        {sortOptions.map(option =>
          <option key={option.label}>{option.label}</option>  
        )}
      </select>
      <label htmlFor="sortAscending">Ascending</label>
      <input type="radio" name="sortOrder" />
      <label htmlFor="sortDescending">Descending</label>
      <input type="radio" name="sortOrder" />
    </div>
  )
}

export default FilterSortSection