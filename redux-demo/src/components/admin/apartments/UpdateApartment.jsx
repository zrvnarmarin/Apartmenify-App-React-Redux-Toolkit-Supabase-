import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectFacilities, getAllFacilities, updateApartment } from './apartmentsSlice'
import Select from '../../../UI/Select'

const UpdateApartment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const apartmentData = location.state

    const [updatedApartment, setUpdatedApartment] = useState(apartmentData)
    const facilities = useSelector(selectFacilities)
    const [selectedFacilities, setSelectedFacilities] = useState(apartmentData.facilities.map(facility => {
        return { value: facility, label: facility}
    }))

    console.log(updatedApartment)
    
    const submitFormHandler = e => {
        e.preventDefault()

        const updatedApartmentObject = {
            id: updatedApartment.id,
            title: updatedApartment.title,
            description: updatedApartment.description,
            rooms: updatedApartment.rooms,
            address: updatedApartment.address,
            city: updatedApartment.city,
            distanceFromTheSea: updatedApartment.distanceFromTheSea,
            price: updatedApartment.price,
            singleBeds: updatedApartment.singleBeds,
            doubleBeds: updatedApartment.doubleBeds,
            availability: updatedApartment.availability,
            facilities: selectedFacilities.map(facility => facility.value)
        }
        
        console.log(updatedApartmentObject)

        dispatch(updateApartment(updatedApartmentObject))

        navigate('/adminDashboard/apartments')
    }

    useEffect(() => {
        dispatch(getAllFacilities())
    }, [])

  return (
    <div className='px-6 py-12 border-[1px] border-black flex flex-col gap-7'>
      <h1 className='text-3xl font-semibold text-[#f4eff0]'>Update Apartment</h1>
      <form onSubmit={submitFormHandler} className='grid grid-cols-2 gap-4'>
        <input 
            value={updatedApartment.title} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, title: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Title' 
        />
        <input 
            value={updatedApartment.city} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, city: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='City' 
        />
        <input 
            value={updatedApartment.price} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, price: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Price' 
        />
        <input 
            value={updatedApartment.distanceFromTheSea} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, distanceFromTheSea: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Distance From The Sea' 
        />
        <input 
            value={updatedApartment.description} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, description: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Description' 
        />
        <input 
            value={updatedApartment.address} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, address: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Address' 
        />
        <input 
            value={updatedApartment.rooms} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, rooms: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Rooms' 
        />
        <input 
            value={updatedApartment.singleBeds} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, singleBeds: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Single Beds' 
        />
        <input 
            value={updatedApartment.doubleBeds} 
            onChange={e => setUpdatedApartment(prev => { return { ...prev, doubleBeds: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Double Beds' 
        />
        <Select
          multiple
          name={'Facilities'}
          options={facilities}
          value={selectedFacilities}
          onChange={selectedFacilities => setSelectedFacilities(selectedFacilities)}
        />
        <button className='col-start-2 col-end-3 px-6 py-2 font-medium bg-[#0C768A] text-[#f5eced]'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateApartment