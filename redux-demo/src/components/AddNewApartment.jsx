import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addApartment, getAllFacilities, selectFacilities, selectIsLoading } from './apartmentsSlice'
import Select from '../UI/Select'
import supabase from '../supabaseClient';

const AddNewApartment = () => {
  const navigate = useNavigate() 
  const dispatch = useDispatch()
  
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [distanceFromTheSea, setDistanceFromTheSea] = useState('')
  const [description, setDescription] = useState('')
  const [rooms, setRooms] = useState('')
  const [singleBeds, setSingleBeds] = useState('')
  const [doubleBeds, setDoubleBeds] = useState('')
  
  const [selectedFacilities, setSelectedFacilities] = useState([{ label: "Wi-Fi", value: 'Wi-Fi' }])
  const facilities = useSelector(selectFacilities)

  const titleChangeHandler = e => setTitle(e.target.value)
  const cityChangeHandler = e => setCity(e.target.value)
  const addressChangeHandler = e => setAddress(e.target.value)
  const priceChangeHandler = e => setPrice(e.target.value)
  const distanceFromTheSeaChangeHandler = e => setDistanceFromTheSea(e.target.value)
  const descriptionChangeHandler = e => setDescription(e.target.value)
  const roomsChangeHandler = e => setRooms(e.target.value)
  const singleBedsChangeHandler = e => setSingleBeds(e.target.value)
  const doubleBedsChangeHandler = e => setDoubleBeds(e.target.value)

  const isLoading = useSelector(selectIsLoading)

  const bucket = async () => {
    console.log(supabase)
  }

  const formSubmitHandler = async e => {
    e.preventDefault()

    // Upload apartment data
    dispatch(addApartment({
      title: title,
      city: city,
      price: price,
      distanceFromTheSea: distanceFromTheSea,
      rooms: rooms,
      description: description,
      address: address,
      singleBeds: singleBeds,
      doubleBeds: doubleBeds,
      facilities: selectedFacilities.map(selectedFacility => selectedFacility.value),
      availability: 'free'
    }))

    navigate('/main/apartments')
  }

  useEffect(() => {
    dispatch(getAllFacilities())
  }, [])

  return (
    <div className='p-2 border-[1px] border-black flex flex-col gap-7'>
      <h1 className='text-2xl'>Add New Apartment</h1>
      <form onSubmit={formSubmitHandler} className='grid grid-cols-2 gap-4'>
        <input value={title} onChange={titleChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Title' />
        <input value={city} onChange={cityChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='City' />
        <input value={price} onChange={priceChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Price' />
        <input value={distanceFromTheSea} onChange={distanceFromTheSeaChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Distance From The Sea' />
        <input value={description} onChange={descriptionChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Description' />
        <input value={address} onChange={addressChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Address' />
        <input value={rooms} onChange={roomsChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Rooms' />
        <input value={singleBeds} onChange={singleBedsChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Single Beds' />
        <input value={doubleBeds} onChange={doubleBedsChangeHandler} type="text" className='border-[1px] border-black p-1' placeholder='Double Beds' />
        <Select
          multiple
          name={'Facilities'}
          options={facilities}
          value={selectedFacilities}
          onChange={selectedFacilities => setSelectedFacilities(selectedFacilities)}
        />
        <input type="file" />
        <button className='border-[1px] border-black p-1 bg-blue-50'>Submit</button>
        <button onClick={bucket}>Bucket Check</button>
      </form>
    </div>
  )
}

export default AddNewApartment