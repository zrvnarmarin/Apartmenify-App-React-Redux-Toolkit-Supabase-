import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FilterSortSection from './FilterSortSection'
import ApartmentTable from './ApartmentTable'
import { getApartmentsError, selectFilteredAndSortedApartments, getApartmentsStatus, selectIsLoading } from './apartmentsSlice'
import LoadingSpinner from '../UI/Loading Spinner/LoadingSpinner'

const Apartments = () => {
  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)
  const apartmentsError = useSelector(getApartmentsError)

  const isLoading = useSelector(selectIsLoading)

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='p-2 border-[1px] border-black flex flex-col gap-3'>
      
      <div className='flex flex-row flex-wrap justify-between'>
      <h1 className='text-2xl'>Apartments</h1>
        <button className="p-2 bg-blue-50 border-[1px] border-black">
          <Link to="/main/addNewApartment">
            +Add New Apartment
          </Link>
        </button>
      </div>

      <FilterSortSection />

      {apartmentsStatus === 'loading' ? (
        <p>Loading...</p>
      ) : apartmentsStatus === 'failed' ? (
        <p>{apartmentsError}</p>
      ) : (
        <ApartmentTable apartments={filteredAndSortedApartments} />
      )}

    </div>
  )
}

export default Apartments