import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabaseClient'
import Select from '../UI/Select'
import { getAllApartments, getApartment, addTestApartment, deleteTestApartment, getAllFacilities } from './apartmentsSlice'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const [apartments, setApartments] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rooms, setRooms] = useState('')
  const [facilities, setFacilities] = useState([{ label: "Wi-Fi", value: 'Wi-Fi' }])
  const [selectedFacilities, setSelectedFacilities] = useState([])

  const titleChangeHandler = e => setTitle(e.target.value)
  const roomsChangeHandler = e => setRooms(e.target.value)
  const descriptionChangeHandler = e => setDescription(e.target.value)

  console.log(facilities, selectedFacilities)

  const dispatch = useDispatch()

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setRooms('')
    setFacilities([{ label: "Wi-Fi", value: 'Wi-Fi' }])
  }

  const fetchApartments = async () => {
    const { data, error } = await supabase
      .from('apartments')
      .select()
  
    if (data) { setApartments(data) }
  }

  const fetchFacilities = async () => {
    const { data, error } = await supabase
    .from('facilities')
    .select()
    
    if (data) {
      const facilityObjects = data.map(facility => ({ value: facility.name, label: facility.name }))
      setSelectedFacilities(facilityObjects)
    }
  }
  
  const addApartment = async e => {
    e.preventDefault()
  
    const { data, error } = await supabase
      .from('apartments')
      .insert([
        { 
          title: title, 
          description: description, 
          rooms: rooms, 
          facilities: facilities.map(facility => facility.value)
        }
      ])
      .single()

    dispatch(addTestApartment({ title: 'marin', description: 'marinov apartman', rooms: 2, facilities: facilities.map(facility => facility.value) }))
    dispatch(getAllFacilities())
  
    if (error) {
      console.log(error)
    } else {
      // Refetch the data from the database
      fetchApartments()
    }
  
    // clearForm()
  }

  const deleteApartment = async id => {
    const { data, error } = await supabase
    .from('apartments')
    .delete()
    .eq('id', id);

    setApartments(prev => [...prev.filter(apartment => apartment.id !== id)])
  }

  useEffect(() => {
    fetchApartments()
    fetchFacilities()
    dispatch(getAllApartments())
    dispatch(getApartment(106))
  }, [])

  return (
    <div style={{ border: '1px solid black', padding: '5px'}}>
      <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <input type="text" placeholder="Enter username" className='p-2 border-[1px] border-black' />
        <input type="text" placeholder="Enter password" className='p-2 border-[1px] border-black' />
        <button className='border-[1px] border-black p-2 bg-blue-50'>Log In</button>

        Log In Page
      </div>
      <Link to='/signup' className='underline text-blu-300'>Dont have an account yet? Sign up!</Link> <br /><br />
      <Link to='/main/apartments' className='underline text-blu-300'>enter app</Link>


      <form onSubmit={addApartment} className='border-2 border-black flex flex-col gap-4 bg-indigo-200'>
        <input value={title} onChange={titleChangeHandler} type="text" placeholder='title' />
        <input value={rooms} onChange={roomsChangeHandler} type="text" placeholder='rooms' />
        <input value={description} onChange={descriptionChangeHandler} type="text" placeholder='description' />
        <Select
          multiple
          name={'Facilities'}
          options={selectedFacilities}
          value={facilities}
          onChange={facility => setFacilities(facility)}
        />

        <button className='p-2 border-2 border-black'>Add new apartment</button>
      </form>

      <div className='flex flex-col gap-2 bg-red-100'>
        {apartments.map(apartment =>
          <div key={apartment.id} className='bg-green-200'>
            <p>ID: {apartment.id}</p>
            <p>{apartment.rooms}</p>
            <p>{apartment.description}</p>
            <p>{JSON.stringify(apartment.facilities)}</p>
            <button onClick={() => {
              dispatch(deleteTestApartment(apartment.id))
            }} className='bg-red-300 text-white p-2 border-2 border-black'>delete in redux store</button>
            <button onClick={() => deleteApartment(apartment.id)} className='bg-red-300 text-white p-2 border-2 border-black'>Delete</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default LoginPage