import React from 'react'

const FilterSortSection = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid red'}}>
      <label htmlFor="filter">Filter by: </label>
      <select id='filter'>
        <option>All</option>
        <option>City</option>
        <option>Address</option>
        <option>Title</option>
      </select>
      <input type="text" placeholder='Enter filter value...' /> 
      
      <br />

      <label htmlFor="sort">Sort by: </label>
      <input type="text" id='filter' />
      <label htmlFor="sortAscending">Ascending</label>
      <input type="radio" name="sort" />
      <label htmlFor="sortDescending">Descending</label>
      <input type="radio" name="sort" />
    </div>
  )
}

export default FilterSortSection