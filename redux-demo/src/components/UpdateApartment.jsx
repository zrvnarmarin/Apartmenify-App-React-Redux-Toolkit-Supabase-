import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectFacilities, getAllFacilities, updateApartment } from './apartmentsSlice'
import Select from '../UI/Select'

const UpdateApartment = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const apartmentData = location.state
    const [updatedApartment, setUpdatedApartment] = useState(apartmentData)
    const facilities = useSelector(selectFacilities)
    const [selectedFacilities, setSelectedFacilities] = useState(apartmentData.facilities.map(facility => {
        return { value: facility, label: facility}
    }))

    // console.log(selectedFacilities)
    
    const submitFormHandler = e => {
        e.preventDefault()

        const updatedApartmentObject = {
            title: updatedApartment.title,
            description: updatedApartment.description,
            rooms: updatedApartment.rooms,
            address: updatedApartment.address,
            city: updatedApartment.city,
            distanceFromTheSea: updatedApartment.distanceFromTheSea,
            price: updatedApartment.price,
            singleBeds: updatedApartment.singleBeds,
            doubleBeds: updatedApartment.doubleBeds,
        }
        
        console.log(updatedApartmentObject)

        dispatch(updateApartment(updatedApartmentObject))
    }

    useEffect(() => {
        dispatch(getAllFacilities())
    }, [])

  return (
    <div className='p-2 border-[1px] border-black flex flex-col gap-7'>
      <h1 className='text-2xl'>Update Apartment</h1>
      <form onSubmit={submitFormHandler} className='grid grid-cols-2 gap-4'>
      <input 
  value={apartmentData.title} 
  onChange={e => setUpdatedApartment(prev => { 
    return { ...prev, title: e.target.value }
  })} 
  type="text" 
  className='border-[1px] border-black p-1' 
  placeholder='Title' 
/>

        <input 
            value={updatedApartment.city} 
            onChange={e => setUpdatedApartment(prev => { return { prev, city: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='City' 
        />
        <input 
            value={updatedApartment.price} 
            onChange={e => setUpdatedApartment(prev => { return { prev, price: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Price' 
        />
        <input 
            value={updatedApartment.distanceFromTheSea} 
            onChange={e => setUpdatedApartment(prev => { return { prev, distanceFromTheSea: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Distance From The Sea' 
        />
        <input 
            value={updatedApartment.description} 
            onChange={e => setUpdatedApartment(prev => { return { prev, description: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Description' 
        />
        <input 
            value={updatedApartment.address} 
            onChange={e => setUpdatedApartment(prev => { return { prev, address: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Address' 
        />
        <input 
            value={updatedApartment.rooms} 
            onChange={e => setUpdatedApartment(prev => { return { prev, rooms: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Rooms' 
        />
        <input 
            value={updatedApartment.singleBeds} 
            onChange={e => setUpdatedApartment(prev => { return { prev, singleBeds: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Single Beds' 
        />
        <input 
            value={updatedApartment.doubleBeds} 
            onChange={e => setUpdatedApartment(prev => { return { prev, doubleBeds: e.target.value }})} 
            type="text" 
            className='border-[1px] border-black p-1' 
            placeholder='Double Beds' 
        />
        <Select
          multiple
          name={'Facilities'}
          options={facilities}
          value={selectedFacilities}
          onChange={selectedFacilities => setSelectedFacilities(selectedFacilities)}
        />
        <button className='border-[1px] border-black p-1 bg-blue-50'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateApartment