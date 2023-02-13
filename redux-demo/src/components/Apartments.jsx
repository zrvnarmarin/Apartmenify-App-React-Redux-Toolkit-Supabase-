import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FilterSortSection from './FilterSortSection'
import ApartmentTable from './ApartmentTable'
import { selectAllApartments, getApartmentsError, getApartmentsStatus, fetchApartments } from './apartmentsSlice'

const Apartments = () => {
  const [filter, setFilter] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [sort, setOrder] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  const filterChangeHandler = e => setFilter(e.target.value)
  const filterQueryChangeHandler = e => setFilterQuery(e.target.value)
  const sortChangeHandler = e => setOrder(e.target.value)
  const sortOrderChangeHandler = e => setSortOrder(e.target.value)

  const dispatch = useDispatch()
  const apartments = useSelector(selectAllApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)
  const apartmentsError = useSelector(getApartmentsError)

  useEffect(() => {
    if (apartmentsStatus === 'idle') {
      dispatch(fetchApartments())
    }
  }, [apartmentsStatus, dispatch])

  let allApartments

  if (apartmentsStatus === 'loading') { allApartments = <p>Loading...</p> }
  else if (apartmentsStatus === 'successed') { allApartments = <ApartmentTable apartments={apartments} /> }
  else if (apartmentsStatus === 'failed') { allApartments = <p>{apartmentsError}</p> }

  return (
    <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
      <div className='flex flex-row flex-wrap justify-between'>
        <h1>Apartments</h1>
        <button>
          <Link to="/main/addNewApartment">
            +Add New Apartment
          </Link>
        </button>
      </div>
      <FilterSortSection
        filter={filter}
        filterQuery={filterQuery}
        sort={sort}
        sortOrder={sortOrder}
        onFilterChange={filterChangeHandler}
        onFilterQueryChange={filterQueryChangeHandler}
        onSortChange={sortChangeHandler}
        onSortOrderChange={sortOrderChangeHandler}
      />
      {allApartments}
    </div>
  )
}

export default Apartments