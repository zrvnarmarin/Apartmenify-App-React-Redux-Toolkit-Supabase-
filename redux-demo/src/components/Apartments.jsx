import React, { useState, useEffect, useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FilterSortSection from './FilterSortSection'
import ApartmentTable from './ApartmentTable'
import { getFilter, getFilterQuery, getApartmentsError, getApartmentsStatus, getSort, getSortOptions, getSortOrder } from './apartmentsSlice'

const Apartments = () => {
  const [sortOrder, setSortOrder] = useState('')
  const sortOrderChangeHandler = e => setSortOrder(e.target.value)

  const { apartments } = useOutletContext()

  const apartmentsStatus = useSelector(getApartmentsStatus)
  const apartmentsError = useSelector(getApartmentsError)

  const filter = useSelector(getFilter)
  const filterQuery = useSelector(getFilterQuery)
  
  const filteredApartments = useMemo(() => {
    return apartments.filter(apartment => {
      if (filter === 'All') {
        return apartments;
      }
      else if (filter === 'Title') {
        return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
      }
      else if (filter === 'Address') {
        return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else if (filter === 'City') {
        return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
      } 
      else {
        return apartments;
      }
    });
  }, [apartments, filter, filterQuery]);

  return (
    <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
      
      <div className='flex flex-row flex-wrap justify-between'>
        <h1>Apartments</h1>
        <button className="p-2 bg-blue-50 border-[1px] border-black">
          <Link to="/main/addNewApartment">
            +Add New Apartment
          </Link>
        </button>
      </div>

      <FilterSortSection
        sortOrder={sortOrder}
        onSortOrderChange={sortOrderChangeHandler}
      />

      {apartmentsStatus === 'loading' ? (
        <p>Loading...</p>
      ) : apartmentsStatus === 'failed' ? (
        <p>{apartmentsError}</p>
      ) : (
        <ApartmentTable apartments={filteredApartments} />
      )}

    </div>
  )
}

export default Apartments