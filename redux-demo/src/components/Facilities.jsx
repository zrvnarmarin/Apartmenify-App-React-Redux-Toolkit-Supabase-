import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { fetchApartments, setNewFacility, getFacilityGroups, setFacilityGroups, deleteFacilityGroup } from './apartmentsSlice';

const Facilities = () => {
  const [facility, setFacility] = useState('')
  const [newFacilities, setNewFacilities] = useState([])
  const facilityGroups = useSelector(getFacilityGroups)

  const dispatch = useDispatch()
  const facilityInputHandler = e => setFacility(e.target.value)

  const formSubmitHandler = e => {
    e.preventDefault()

    dispatch(setNewFacility(facility))
    setNewFacilities(prev => [...prev, { id: v4(), name: facility, count: 0}])
    setFacility('')
    dispatch(setFacilityGroups(newFacilities))
  }

  const deleteNewFacility = (id) => {
    setNewFacilities(newFacilities.filter(newFacility => newFacility.id !== id))

  }

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])

  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1 className='text-2xl'>
        <Link to={`/main/facilities`}>Facilities</Link>
      </h1>

      {facilityGroups.map((facility, i) =>
        <div key={facility.id}>
          <Link to={`/main/facilities/${facility.name}`}>
            <span>{facility.name}</span>
            <span> ({facility.count})</span>
            { 
              facility.count === 0 
              ? <button 
                className='p-2 bg-blue-50 border-[1px] border-black'
                onClick={() => {
                deleteNewFacility(facility.id)
                dispatch(deleteFacilityGroup(facility.id))
              }}>Delete</button> 
              : ''
            }
          </Link>
        </div>
      )}

      <form onSubmit={formSubmitHandler} className='flex flex-row gap-2 p-2 border-2 border-black'>
       
        <input
          type="text"
          placeholder="Add new facility.."
          className='border-[1px] border-black p-1'
          value={facility}
          onChange={facilityInputHandler}
        />

        <button
          className="p-2 bg-blue-50 border-[1px] border-black"
        >
          {/* { isButtonEnabled ? 'Cancel' : '+Add New Facility' } */}
          +Add New Facility
        </button>

      </form>

      <Outlet />
    </div>
  )
}

export default Facilities