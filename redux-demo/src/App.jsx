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
import AdminDashboard from './components/admin/layout/AdminDashboard.jsx'
import Apartments from './components/admin/apartments/Apartments.jsx'
import Facilities from './components/admin/facilities/Facilities.jsx';
import Reservations from './components/admin/reservations/Reservations.jsx';
import Users from './components/admin/users/Users';
import AddNewApartment from './components/admin/apartments/AddNewApartment';
import Success from './components/auth/Success.jsx'
import UpdateApartment from './components/admin/apartments/UpdateApartment';
import UpdateReservation from './components/admin/reservations/UpdateReservation';
import Stats from './components/admin/stats/Stats.jsx'
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
        <Route path='/adminDashboard' element={<AdminDashboard />} >
          <Route path='apartments' element={<Apartments />} />
          <Route path='apartments/:apartment' element={<UpdateApartment />} />
          <Route path='facilities' element={<Facilities />} />
          <Route path='users' element={<Users />} />
          <Route path='addNewApartment' element={<AddNewApartment />} />
          <Route path='reservations' element={<Reservations />} />
          <Route path='reservations/:reservation' element={<UpdateReservation />} />
          <Route path='stats' element={<Stats />} />
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
