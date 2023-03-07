// import PostsList from './features/posts/PostsList'
// import AddNewPostForm from './features/posts/AddNewPostForm'
// import Counter from './features/counter/Counter'
// import CartShop from './features/cart/CartShop'
{/* <Route path='/cart' element={<CartShop /> } /> */} //ovo uvedi u outer da bi prikazao cart shop

import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
// Admin components
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import LoginPage from './components/LoginPage';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import FacilityGroupedApartments from './components/FacilityGroupedApartments.jsx'
import Success from './components/auth/Success.jsx'
// User components
import UserDashboard from './components/user/UserDashboard'
import SearcApartments from './components/user/SearchApartments';
import Contact from './components/user/Contact';
import Apartment from './components/user/Apartment';
import ApartmentDetails from './components/user/ApartmentDetails';

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
        {/* Admin routes - should be protected */}
        <Route path='/main' element={<MainPage />} >
          <Route path='apartments' element={<Apartments />} />
          <Route path='facilities' element={<Facilities />} >
            <Route path=':facility' element={<FacilityGroupedApartments />} />
          </Route>
          <Route path='registeredUsers' element={<RegisteredUsers />} />
          <Route path='addNewApartment' element={<AddNewApartment />} />
        </Route>
        {/* User routes - should be public */}
        <Route path='/userDashboard' element={<UserDashboard />} >
          <Route path='searchApartments' element={<SearcApartments />} />
          <Route path='searchApartments/:apartment' element={<ApartmentDetails />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
