import React, { useState } from 'react'

const FilterSortSection = ({ filter, filterQuery, sort, sortOrder, onFilterChange, onFilterQueryChange, onSortChange, onSortOrderChange }) => {
  
  const filterOptions = [
    { label: 'All', value: 'All'},
    { label: 'City', value: 'City'},
    { label: 'Address', value: 'Address'},
    { label: 'Title', value: 'Title'},
  ]

  const sortOptions = [
    { label: 'Id', value: 'id'},
    { label: 'Price', value: 'price'},
    { label: 'Rooms', value: 'rooms'}
  ]

  return (
    <div style={{ padding: '5px', border: '1px solid red'}}>
      <label htmlFor="filter">Filter by: </label>
      <select value={filter} onChange={onFilterChange} id='filter'>
        {filterOptions.map(option =>
          <option key={option.label}>{option.label}</option>  
        )}
      </select>
      <input 
        value={filterQuery} 
        onChange={onFilterQueryChange}
        type="text" 
        placeholder='Enter filter value...' 
      /> 
        
      <br />

      <label htmlFor="sort">Sort by: </label>
      <select value={sort} onChange={onSortChange} id='filter'>
        {sortOptions.map(option =>
          <option key={option.label}>{option.label}</option>  
        )}
      </select>
      <label htmlFor="sortAscending">Ascending</label>
      <input type="radio" name="sort" />
      <label htmlFor="sortDescending">Descending</label>
      <input type="radio" name="sort" />
    </div>
  )
}

export default FilterSortSection