import React, { useState, useEffect } from 'react'
import { facilities } from './../data/facilities';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, fetchApartments } from './apartmentsSlice';
import { Link, Outlet } from 'react-router-dom';
import FacilityGroup from './FacilityGroup';

const Facilities = () => {
  const [newTag, setNewTag] = useState('')
  const [isAddNewTagButtonPressed, setIsAddNewTagButtonPressed] = useState(false)
  
  const newTagChangeHandler = e => setNewTag(e.target.value)
  const isAddNewTagButtonPressedClickHandler = e => setIsAddNewTagButtonPressed(true)

  const apartments = useSelector(selectAllApartments)
  const dispatch = useDispatch()

  const facilityAndNumberOfOccurrencesObject = apartments
  .map(apartment => apartment.facilities)
  .reduce((acc, curr) => acc.concat(curr), [])
  .reduce((acc, curr) => {
    acc[curr.value] = (acc[curr.value] || 0) + 1;
    return acc;
  }, {});

  let arrayOfFacilitiesAndNumberOfEachOccurences = []

  for (let key in facilityAndNumberOfOccurrencesObject) {
    arrayOfFacilitiesAndNumberOfEachOccurences.push({
      facility: key,
      occurredTimes: facilityAndNumberOfOccurrencesObject[key]
    })
  }


  const groupFacilities = apartments => {
    let facilities = [];
    
    apartments.map(apartment => {
      apartment.facilities.forEach(facility => {
        let existingFacility = facilities.find(f => f.value === facility.value);
        if (existingFacility) {
          existingFacility.apartments.push(apartment);
        } else {
          facilities.push({ value: facility.value, apartments: [apartment] });
        }
      });
    });
    
    return facilities;
  }
  console.log(groupFacilities(apartments))

  

  useEffect(() => {
    dispatch(fetchApartments())
  }, [])

  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1 className='text-2xl'>Facilities</h1>
      {arrayOfFacilitiesAndNumberOfEachOccurences.map((facility, i) =>
          <div key={facility.facility}>
            <Link to={`/main/facilities/${facility.facility}`}>
              <span>{facility.facility}</span>
              <span> ({facility.occurredTimes})</span>
            </Link>
          </div>
      )}
      { isAddNewTagButtonPressed &&
        <input value={newTag} onChange={newTagChangeHandler} type="text" placeholder='Add new tag' className="p-2 border-[1px] border-black" />
      }
      <button onClick={isAddNewTagButtonPressedClickHandler} className="p-2 bg-blue-50 border-[1px] border-black">+Add New Tag</button>
    </div>
  )
}

export default Facilities