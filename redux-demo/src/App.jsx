import React, { useState, useEffect } from 'react'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import FacilityGroupedApartments from './components/FacilityGroupedApartments.jsx'
import SignupPage from './components/SignupPage';
import CartShop from './features/cart/CartShop'
import supabase from './supabaseClient'

const Form = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rooms, setRooms] = useState(0)
  const [error, setError] = useState(null)

  const titleChangeHandler = e => setTitle(e.target.value)
  const descriptionChangeHandler = e => setDescription(e.target.value)
  const roomsChangeHandler = e => setRooms(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title && !description && !rooms) {
      setError('Please fill the fields')
      return
    }

    const { data, error } = await supabase
    .from('apartments')
    .insert([{ title, description, rooms }])
    
    if (error) {
      console.log(error)
      setError('Please fill the fields')
    } 
    if (data) {
      console.log(data)
      
    }
  }

  return (
    <form onSubmit={handleSubmit} className='border-2 border-black p-2 flex flex-col gap-2'>
      <input value={title} onChange={titleChangeHandler} type="text" placeholder='title' />
      <input value={description} onChange={descriptionChangeHandler} type="text" placeholder='description' />
      <input value={rooms} onChange={roomsChangeHandler} type="text" placeholder='rooms' />
      <button>Submit</button>
    </form>
  )
}

function App() {
  return (
    <div>
      {/* <Counter />
      <div style={{ padding: '5px', border: '1px solid black'}}>
        <PostsList />
        <AddNewPostForm />
      </div> */}

      <Routes>
        <Route path='/' element={<LoginPage />} />
        {/* <Route path='/cart' element={<CartShop /> } /> */}
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='apartments' element={<Apartments />} />
          <Route path='facilities' element={<Facilities />} >
            <Route path=':facility' element={<FacilityGroupedApartments />} />
          </Route>
          <Route path='registeredUsers' element={<RegisteredUsers />} />
          <Route path='addNewApartment' element={<AddNewApartment />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
