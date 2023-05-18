import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFacility, selectCountOfApartmentsByFacility, selectApartmentsByFacility } from '../apartments/apartmentsSlice';
import ApartmentTable from '../apartments/ApartmentTable';

const Facilities = () => {
  const dispatch = useDispatch()

  const [isActive, setIsActive] = useState(0)

  const [newFacility, setNewFacility] = useState("");
  const newFacilityChangeHandler = (e) => setNewFacility(e.target.value)
  const resetNewFacility = () => setNewFacility('')

  const [existingFacility, setExistingFacility] = useState('')
  const existingFacilityClickHandler = existingFacility => setExistingFacility(existingFacility)

  const countOfApartmentsByFacility = useSelector(selectCountOfApartmentsByFacility)
  const apartmentsByFacility = useSelector(selectApartmentsByFacility(existingFacility))

  const formSubmitHandler = e => {
    e.preventDefault()

    dispatch(addFacility(newFacility))
    
    toast.success('New facility added!')

    resetNewFacility()
  }

  return (
    <div className='flex flex-col gap-4'>

      <div className='flex flex-row flex-wrap justify-between items-center'>
        <h1 className='text-3xl mb-2 font-semibold text-[#f4eff0] ml-4 mt-4'>Facilities</h1>

        <form onSubmit={formSubmitHandler} className='flex flex-row gap-2'>
          <input
            type="text"
            placeholder="Add new facility.."
            className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
            value={newFacility}
            onChange={newFacilityChangeHandler}
          />
          <button className="px-6 py-2 rounded-md font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54] drop-shadow-lg">
            Add New Facility
          </button>
        </form>
      </div>

      <div className='flex flex-row flex-wrap gap-4 mx-4'>
      {Object.entries(countOfApartmentsByFacility).map(([facility, count], i) =>
        <span 
          key={i} 
          className={`${isActive === i + 1 ? 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]' : 'bg-[#121212]'} px-6 py-2 rounded-md font-medium text-[#f5eced]`}
        >
          <Link 
            to={`/adminDashboard/facilities`} 
            onClick={() => {
              setIsActive(i + 1)
              existingFacilityClickHandler(facility)
            }}
          >
            <span>{facility}</span>
            <span className='rounded-full ml-2 px-3 py-1 bg-[#1f1f1f]'>{count}</span>
          </Link>
        </span>
      )}
      </div>

      <div className='flex flex-col gap-3 mx-4'>
        <ApartmentTable apartments={apartmentsByFacility} />
      </div>

    </div>
  )
}

export default Facilities
