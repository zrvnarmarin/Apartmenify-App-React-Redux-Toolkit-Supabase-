import React, { useState, useEffect } from 'react'
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'
import PostsList from './features/posts/PostsList'
import AddNewPostForm from './features/posts/AddNewPostForm'
import Counter from './features/counter/Counter'
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import FacilityGroupedApartments from './components/FacilityGroupedApartments.jsx'
import SignupPage from './components/SignupPage';
import CartShop from './features/cart/CartShop'


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
        <Route path='/cart' element={<CartShop /> } />
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
