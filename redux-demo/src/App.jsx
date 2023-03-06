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
import CartShop from './features/cart/CartShop'
import Success from './components/auth/Success.jsx'
{/* <Route path='/cart' element={<CartShop /> } /> */} //ovo uvedi u outer da bi prikazao cart shop

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
        <Route path='/success' element={<Success />} />
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
