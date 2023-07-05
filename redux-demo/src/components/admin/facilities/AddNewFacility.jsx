import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { addFacility } from '../apartments/apartmentsSlice';

const AddNewFacility = () => {
  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const [newFacility, setNewFacility] = useState("");
  const newFacilityChangeHandler = (e) => setNewFacility(e.target.value)
  const resetNewFacility = () => setNewFacility('')

  const formSubmitHandler = e => {
    e.preventDefault()
    dispatch(addFacility(newFacility))
    toast.success('New facility added!')
    resetNewFacility()
    navigate('/adminDashboard/facilities')
  }

  return (
    <div className=' mx-2 px-6 py-12 flex flex-col gap-7'>
      <h1 className='text-3xl font-semibold text-[#f4eff0]'>Add New Facility</h1>
      <form onSubmit={formSubmitHandler} className='grid grid-cols-2 gap-4 '>
        <input
          type="text"
          placeholder="Add new facility.."
          className='col-start-1 col-end-2 bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600'
          value={newFacility}
          onChange={newFacilityChangeHandler}
        />
        <div className='flex items-center'>
          <input 
            type="file" 
            id='facility_pic'
            name='facility_pic'
            className='col-start-1 col-end-2 bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600'
          />
        </div>
        <button className="col-start-1 col-end-3 px-6 py-2 my-4 ss:my-0 text-lg font-medium bg-[#0C768A] text-[#f5eced]">
          Add New Facility
        </button>
      </form>
    </div>
  )
}

export default AddNewFacility