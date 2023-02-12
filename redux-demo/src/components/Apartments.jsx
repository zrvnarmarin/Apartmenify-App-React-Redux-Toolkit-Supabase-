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
  


//   const apartments = [
//     { id: 1, address: 'Ulica Mateja gorana Kovacica 5', city: 'Split', description: 'Ovo je neka random deskripcija', distanceFromtheSea: 2.5, doubleBeds: 3, singleBeds: 4, price: 45.99, rooms: 2, title: 'Sunny apartment', facilities: ['Wi-Fi', 'Refrigerator', 'Pool'] },
//     { id: 2, address: 'Ulica Mislava Tuđmana 12', city: 'Vodice', description: 'Deskripcija sam ja', distanceFromtheSea: 2.5, doubleBeds: 5, singleBeds: 7, price: 12.00, rooms: 4, title: 'Rainy apartment', facilities: ['Wi-Fi', 'Refrigerator', 'Pool'] },
//     { id: 3, address: 'Tičarnica 12a', city: 'Zadar', description: 'Zadar je jako lijep grad', distanceFromtheSea: 5.5, doubleBeds: 1, singleBeds: 2, price: 19.99, rooms: 3, title: 'Cloudy apartment', facilities: ['Wi-Fi', 'Refrigerator', 'Pool'] },
//   ]

console.log(apartments)

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
        <ApartmentTable />
    </div>
  )
}

export default Apartments