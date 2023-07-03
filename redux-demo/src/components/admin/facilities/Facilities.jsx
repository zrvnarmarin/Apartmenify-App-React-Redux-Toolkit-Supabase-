import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFacility, selectCountOfApartmentsByFacility, selectApartmentsByFacility } from '../apartments/apartmentsSlice';
import ApartmentTable from '../apartments/ApartmentTable';
import { mappedFacilities } from '../../../data/facilities/mappedFacilitiesWithIcons';
import RouteContainer from '../layout/RouteContainer';
import AddNewFacility from './AddNewFacility';

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

  const facilityObjects = Object.entries(countOfApartmentsByFacility).map(facility => {
    let mappedFacility = mappedFacilities.find(mappedFacility => mappedFacility.value === facility[0]) 

    if (mappedFacility) {
      return { value: mappedFacility.value, iconSrc: mappedFacility.icon, occurences: facility[1] }
    }
  })

  return (
    <RouteContainer>
      <div className='flex flex-col ss:flex-row flex-wrap justify-between items-center gap-6'>
        <h1 className='text-3xl font-semibold text-[#f4eff0] text-center ss:text-left'>Facilities</h1>
        {/* <form onSubmit={formSubmitHandler} className='flex flex-col ss:flex-row gap-4 w-full ss:w-fit'>
          <input
            type="text"
            placeholder="Add new facility.."
            className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none focus:border-[1px] border-slate-500'
            value={newFacility}
            onChange={newFacilityChangeHandler}
          />
          <button className="px-6 py-2 my-4 ss:my-0 rounded-md text-lg font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54] drop-shadow-lg">
            Add New Facility
          </button>
        </form> */}
        <button 
        className="px-6 py-2 my-4 ss:my-0 text-lg font-medium bg-[#0C768A] text-[#f5eced] drop-shadow-lg">
        <Link to="/adminDashboard/addNewFacility">Add New Facility</Link>
      </button>
      </div>

      <div className='flex flex-row flex-wrap gap-4 justify-center xs:justify-start'>
        {facilityObjects.map((facility, i) => 
          <span 
            key={facility.value} 
            className={`${isActive === i + 1 ? 'bg-gradient-to-r from-[#e8132f] to-[#fd3b54]' : 'bg-[#121212]'} rounded-md font-medium text-[#f5eced]`}
          >
            <Link 
              to={`/adminDashboard/facilities`} 
              onClick={() => {
                setIsActive(i + 1)
                existingFacilityClickHandler(facility.value)
              }}
              className='flex items-center gap-4 p-2'
            >
              <img 
                src={facility.iconSrc} 
                alt="facility_icon" 
                className='bg-white p-1 rounded-full inline-block' 
                width={40}
                height={40}

              />
              <span>{facility.value}</span>
              <span className='rounded-full ml-2 px-3 py-1 bg-[#1f1f1f]'>{facility.occurences}</span>
            </Link>
          </span>
        )}
      </div>

      <ApartmentTable apartments={apartmentsByFacility} />
    </RouteContainer>
  )
}

export default Facilities
