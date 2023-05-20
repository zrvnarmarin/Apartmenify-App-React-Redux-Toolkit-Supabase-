import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, getFilter, getFilterQuery, setFilterQuery, setSort, getSort, setSortOrder, getSortOrder } from './apartmentsSlice'
import FilterApartments from './filterSort/FilterApartments'
import SortApartments from './filterSort/SortApartments'

const ApartmentFilterSortSection = () => {

  return (
    <div className='p-2 bg-[#121212] rounded-md flex flex-wrap justify-between items-center gap-4'>
      <FilterApartments />
      <SortApartments />
    </div>
  )
}

export default ApartmentFilterSortSection