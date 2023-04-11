import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFacility, selectCountOfApartmentsByFacility, selectApartmentsByFacility } from './apartmentsSlice';
import ApartmentTable from './ApartmentTable';

const Facilities = () => {
  const dispatch = useDispatch()

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

    resetNewFacility()
  }

  return (
    <div className='p-2 border-[1px] border-black flex flex-col gap-2'>

      NEW ADDED FACILITY: {newFacility}

      <div className='flex flex-row flex-wrap justify-between items-center'>
        <h1 className='text-2xl'>
          <Link to={`/main/facilities`}>Facilities</Link>
        </h1>

        <form onSubmit={formSubmitHandler} className='flex flex-row gap-2'>
          <input
            type="text"
            placeholder="Add new facility.."
            className='border-[1px] border-black p-1'
            value={newFacility}
            onChange={newFacilityChangeHandler}
          />
          <button className="p-2 bg-blue-50 border-[1px] border-black">
            +Add New Facility
          </button>
        </form>
      </div>

      <div className='flex flex-row gap-4'>
      {Object.entries(countOfApartmentsByFacility).map(([facility, count], i) =>
        <span key={i} className='border-[1px] border-black p-2'>
          <Link 
            to={`/main/facilities`} 
            onClick={() => existingFacilityClickHandler(facility)}
          >
            <span>{facility}</span>
            <span className='rounded-full ml-2 px-3 py-1 bg-blue-100'>{count}</span>
          </Link>
        </span>
      )}
      </div>

      <div className='flex flex-col gap-3'>
        <ApartmentTable apartments={apartmentsByFacility} />
      </div>
    </div>
  )
}

export default Facilities
