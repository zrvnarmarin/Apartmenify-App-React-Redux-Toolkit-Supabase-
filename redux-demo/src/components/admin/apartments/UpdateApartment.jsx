import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectFacilities, getAllFacilities, updateApartment } from './apartmentsSlice'
import Select from '../../../UI/Select'
import { toast } from 'react-toastify';

const UpdateApartment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const apartmentData = location.state

    const [apartmentToUpdate, setApartmentToUpdate] = useState(apartmentData)
    const facilities = useSelector(selectFacilities)
    const [selectedFacilities, setSelectedFacilities] = useState(apartmentData.facilities.map(facility => {
        return { value: facility, label: facility}
    }))

    const submitFormHandler = e => {
        e.preventDefault()

        const updatedApartmentObject = {
            id: apartmentToUpdate.id,
            title: apartmentToUpdate.title,
            description: apartmentToUpdate.description,
            rooms: apartmentToUpdate.rooms,
            address: apartmentToUpdate.address,
            city: apartmentToUpdate.city,
            distanceFromTheSea: apartmentToUpdate.distanceFromTheSea,
            price: apartmentToUpdate.price,
            singleBeds: apartmentToUpdate.singleBeds,
            doubleBeds: apartmentToUpdate.doubleBeds,
            availability: apartmentToUpdate.availability,
            facilities: selectedFacilities.map(facility => facility.value)
        }
        
        // console.log(updatedApartmentObject, 'UPDATED OBJECT')

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
            value={apartmentToUpdate.title} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, title: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Title' 
        />
        <input 
            value={apartmentToUpdate.city} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, city: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='City' 
        />
        <input 
            value={apartmentToUpdate.price} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, price: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Price' 
        />
        <input 
            value={apartmentToUpdate.distanceFromTheSea} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, distanceFromTheSea: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Distance From The Sea' 
        />
        <input 
            value={apartmentToUpdate.description} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, description: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Description' 
        />
        <input 
            value={apartmentToUpdate.address} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, address: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Address' 
        />
        <input 
            value={apartmentToUpdate.rooms} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, rooms: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Rooms' 
        />
        <input 
            value={apartmentToUpdate.singleBeds} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, singleBeds: e.target.value }})} 
            type="text" 
            className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 border-[1px] border-slate-600' 
            placeholder='Single Beds' 
        />
        <input 
            value={apartmentToUpdate.doubleBeds} 
            onChange={e => setApartmentToUpdate(prev => { return { ...prev, doubleBeds: e.target.value }})} 
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