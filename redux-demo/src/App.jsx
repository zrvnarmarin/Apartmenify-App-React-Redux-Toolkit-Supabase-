// import PostsList from './features/posts/PostsList'
// import AddNewPostForm from './features/posts/AddNewPostForm'
// import Counter from './features/counter/Counter'
// import CartShop from './features/cart/CartShop'
{/* <Route path='/cart' element={<CartShop /> } /> */} //ovo uvedi u outer da bi prikazao cart shop

import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
// General components
import LoginPage from './components/LoginPage';
// Admin components
import MainPage from './components/MainPage'
import Apartments from './components/Apartments'
import Facilities from './components/Facilities';
import Reservations from './components/Reservations';
import RegisteredUsers from './components/RegisteredUsers';
import AddNewApartment from './components/AddNewApartment'
import Success from './components/auth/Success.jsx'
// User components
import UserDashboard from './components/user/UserDashboard'
import SearcApartments from './components/user/SearchApartments';
import Contact from './components/user/Contact';
import ApartmentDetails from './components/user/ApartmentDetails';
import ManageAccount from './components/user/userSettings/ManageAccount';
import UserReservations from './components/user/userSettings/UserReservations';
import Saved from './components/user/userSettings/Saved';

// Toast messages component
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path='facilities' element={<Facilities />} />
          <Route path='registeredUsers' element={<RegisteredUsers />} />
          <Route path='addNewApartment' element={<AddNewApartment />} />
          <Route path='reservations' element={<Reservations />} />
        </Route>
        {/* User routes - should be public */}
        <Route path='/userDashboard' element={<UserDashboard />} >
          <Route path='apartments' element={<SearcApartments />} />
          <Route path='apartments/:apartment' element={<ApartmentDetails />} />
          <Route path='contact' element={<Contact />} />
          <Route path='manageAccount' element={<ManageAccount />} />
          <Route path='userReservations' element={<UserReservations />} />
          <Route path='saved' element={<Saved />} />
        </Route>
      </Routes>

      <ToastContainer />

    </div>
  )
}

export default App
