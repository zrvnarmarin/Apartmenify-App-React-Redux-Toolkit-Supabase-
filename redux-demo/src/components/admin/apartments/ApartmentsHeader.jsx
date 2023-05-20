import React from 'react'
import { Link } from 'react-router-dom'

const ApartmentsHeader = () => {
  return (
    <div className='flex gap-6 flex-col ss:flex-row ss:justify-between'>
        <h1 className='text-3xl font-semibold text-[#f4eff0] text-center ss:text-left'>Apartments</h1>
        <button 
            className="px-6 py-2 rounded-md text-lg font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54] drop-shadow-lg">
            <Link to="/adminDashboard/addNewApartment">Add New Apartment</Link>
        </button>
    </div>
  )
}

export default ApartmentsHeader