import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
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
        <form onSubmit={formSubmitHandler} className='flex flex-col ss:flex-row gap-4 w-full ss:w-fit'>
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
        </form>
    </div>
  )
}

export default AddNewFacility