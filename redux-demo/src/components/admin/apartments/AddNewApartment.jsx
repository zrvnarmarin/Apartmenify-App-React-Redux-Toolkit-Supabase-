import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { addApartment, getAllFacilities, selectFacilities } from './apartmentsSlice'
import Select from '../../../UI/Select'
import supabase from '../../../supabaseClient';
import { v4 } from 'uuid';

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

    toast.success(`Apartment ${title} has been added to database!`)

    navigate('/adminDashboard/apartments')
  }


  const [user, setUser] = useState({})

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    console.log(user)
  }

  useEffect(() => {
    dispatch(getAllFacilities())
    getUser()
  }, [])

  const uploadImage = async (e) => {
    let file = e.target.files[0]
    console.log(file)

    const { data, error } = await supabase
      .storage
      .from('images')
      .upload('apartmentImages/images' + "/" + v4(), file)
  }



  return (
    <div className=' mx-2 px-6 py-12 flex flex-col gap-7'>
      <h1 className='text-3xl font-semibold text-[#f4eff0]'>Add New Apartment</h1>
      <input type="file" onChange={(e) => uploadImage(e)} />
      <form onSubmit={formSubmitHandler} className='grid grid-cols-2 gap-4'>
        <input 
          value={title} 
          onChange={titleChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Title' 
        />
        <input 
          value={city} 
          onChange={cityChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='City' 
        />
        <input 
          value={price} 
          onChange={priceChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Price' 
        />
        <input 
          value={distanceFromTheSea} 
          onChange={distanceFromTheSeaChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Distance From The Sea' 
        />
        <input 
          value={description} 
          onChange={descriptionChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Description' 
        />
        <input 
          value={address} 
          onChange={addressChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Address' 
        />
        <input 
          value={rooms} 
          onChange={roomsChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Rooms' 
        />
        <input 
          value={singleBeds} 
          onChange={singleBedsChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Single Beds' 
        />
        <input 
          value={doubleBeds} 
          onChange={doubleBedsChangeHandler} 
          type="text" 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none' 
          placeholder='Double Beds' 
        />
        <Select
          multiple
          name={'Facilities'}
          options={facilities}
          value={selectedFacilities}
          onChange={selectedFacilities => setSelectedFacilities(selectedFacilities)}
        />
        <button 
          className='col-start-2 col-end-3 px-6 py-2 rounded-md font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNewApartment