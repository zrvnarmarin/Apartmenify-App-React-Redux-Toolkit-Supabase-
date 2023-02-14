import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, fetchApartments } from './apartmentsSlice';
import { Link, Outlet } from 'react-router-dom';
import { selectFacilityOccurences } from './apartmentsSlice';

const Facilities = () => {
  const [facility, setFacility] = useState('')
  const facilityInputHandler = e => setFacility(e.target.value)

  const apartments = useSelector(selectAllApartments)
  const facilityOccurences = useSelector(selectFacilityOccurences);
  const dispatch = useDispatch()

  const facilityAndNumberOfOccurrencesObject = apartments
  .map(apartment => apartment.facilities)
  .reduce((acc, curr) => acc.concat(curr), [])
  .reduce((acc, curr) => {
    acc[curr.value] = (acc[curr.value] || 0) + 1;
    return acc;
  }, {});

console.log(facilityOccurences)
  let arrayOfFacilitiesAndNumberOfEachOccurences = []

  for (let key in facilityAndNumberOfOccurrencesObject) {
    arrayOfFacilitiesAndNumberOfEachOccurences.push({
      facility: key,
      occurredTimes: facilityAndNumberOfOccurrencesObject[key]
    })
  }


  const formSubmitHandler = e => {
    e.preventDefault()

    // console.log(arrayOfFacilitiesAndNumberOfEachOccurences)
  }

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])

  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      
      <h1 className='text-2xl'>
        <Link to={`/main/facilities`}>Facilities</Link>
      </h1>

      {arrayOfFacilitiesAndNumberOfEachOccurences.map(facility =>
          <div key={facility.facility}>
            <Link to={`/main/facilities/${facility.facility}`}>
              <span>{facility.facility}</span>
              <span> ({facility.occurredTimes})</span>
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