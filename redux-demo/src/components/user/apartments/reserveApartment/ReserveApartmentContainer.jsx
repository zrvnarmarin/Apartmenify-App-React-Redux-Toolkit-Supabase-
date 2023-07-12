import React from 'react'
import ReserveApartmentHeader from './ReserveApartmentHeader'
import ReserveApartmentForm from './ReserveApartmentForm'
import ReserveApartmentSummary from './ReserveApartmentSummary'

const ReserveApartmentContainer = ({ apartmentId, apartmentTitle, apartmentPrice }) => {
  return (
    <div className='flex flex-col gap-8 sticky top-8 h-fit'>
      <ReserveApartmentHeader apartmentPrice={apartmentPrice} />
      <ReserveApartmentForm 
        apartmentId={apartmentId} 
        apartmentTitle={apartmentTitle} 
        apartmentPrice={apartmentPrice} 
      />
      <ReserveApartmentSummary apartmentPrice={apartmentPrice} />
    </div>
  )
}

export default ReserveApartmentContainer