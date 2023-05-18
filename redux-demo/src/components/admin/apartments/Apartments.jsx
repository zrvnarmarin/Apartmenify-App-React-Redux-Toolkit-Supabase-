import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ApartmentFilterSortSection from './ApartmentFilterSortSection.jsx.jsx'
import ApartmentTable from './ApartmentTable.jsx'
import { getApartmentsError, selectFilteredAndSortedApartments, getApartmentsStatus, selectIsLoading } from './apartmentsSlice'
import LoadingSpinner from '../../../UI/Loading Spinner/LoadingSpinner'

const Apartments = () => {
  const filteredAndSortedApartments = useSelector(selectFilteredAndSortedApartments)
  const apartmentsStatus = useSelector(getApartmentsStatus)
  const apartmentsError = useSelector(getApartmentsError)

  const isLoading = useSelector(selectIsLoading)

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='p-2 flex flex-col gap-4 mx-2'>
      
      <div className='flex flex-row flex-wrap justify-between my-2'>
      <h1 className='text-3xl font-semibold text-[#f4eff0]'>Apartments</h1>
        <button 
        // px-6 py-2 rounded-md font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#305ee8] to-[#548afd] drop-shadow-lg -- OVO JE PLAVA!
        className="px-6 py-2 rounded-md font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54] drop-shadow-lg">
          <Link to="/adminDashboard/addNewApartment">
            Add New Apartment
          </Link>
        </button>
      </div>

      <ApartmentFilterSortSection />

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