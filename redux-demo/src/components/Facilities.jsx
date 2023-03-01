import React, { useState, useEffect, useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments } from './apartmentsSlice';

const Facilities = () => {
  const apartments = useSelector(selectAllApartments)

  const dispatch = useDispatch()

   // Example usage: Add a new facility "Gym" with count 0
   const [newFacility, setNewFacility] = useState("");
   const newFacilityChangeHandler = (e) => setNewFacility(e.target.value) 
   const handleAddFacility = (e) => {
     ;
   };

  const formSubmitHandler = e => {
    e.preventDefault()
    setNewFacility(newFacility)

  }

  function countFacilities(apartments, newFacility) {
    const facilities = apartments.reduce((count, apartment) => {
      apartment.facilities.forEach(facility => {
        count[facility] = (count[facility] || 0) + 1;
      });
      return count;
    }, {});
  
    // Add new facility with count 0 if it doesn't already exist
    if (newFacility && !facilities[newFacility]) {
      facilities[newFacility] = 0;
    }
  
    return facilities;
  }
  
  const facilityCount = useMemo(() => countFacilities(apartments, newFacility), [apartments, newFacility]);
  

  useEffect(() => {
  }, [apartments])

  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1 className='text-2xl'>
        <Link to={`/main/facilities`}>Facilities</Link>
      </h1>

      {Object.entries(facilityCount).map(([facility, count], i) =>
        <div key={i}>
          <Link to={`/main/facilities/${facility}`}>
            <span>{facility}</span>
            <span> {count}</span>
          </Link>
            { 
              count === 0 
              ? <button 
                className='p-2 bg-blue-50 border-[1px] border-black'
                onClick={() => {
                dispatch(deleteFacilityGroup(i))
              }}>Delete</button> 
              : ''
            }
        </div>
      )}

      <form onSubmit={formSubmitHandler} className='flex flex-row gap-2 p-2 border-2 border-black'>
       
        <input
          type="text"
          placeholder="Add new facility.."
          className='border-[1px] border-black p-1'
          value={newFacility}
          onChange={newFacilityChangeHandler}
        />

        <button
          className="p-2 bg-blue-50 border-[1px] border-black"
        >
          +Add New Facility
        </button>

      </form>

      <Outlet />
    </div>
  )
}

export default Facilities