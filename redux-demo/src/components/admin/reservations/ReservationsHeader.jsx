import React from 'react'
import ReservationFilterSection from './ReservationFilterSection'

const ReservationsHeader = () => {
  return (
    <div className='flex flex-col ss:flex-row flex-wrap items-center justify-between w-full gap-6'>
        <p className='text-3xl font-semibold text-[#f4eff0]'>Reservations</p>
        <ReservationFilterSection />
    </div>
  )
}

export default ReservationsHeader