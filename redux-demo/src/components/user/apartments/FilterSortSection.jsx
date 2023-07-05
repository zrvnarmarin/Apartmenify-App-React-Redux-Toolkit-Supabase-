import React from 'react'
import FilterApartments from './FilterApartments'
import SortApartments from './SortApartments'

const FilterSortSection = () => {

  return (
    <div className='flex flex-wrap justify-between items-center gap-4'>
      <FilterApartments />
      <SortApartments />
    </div>
  )
}

export default FilterSortSection