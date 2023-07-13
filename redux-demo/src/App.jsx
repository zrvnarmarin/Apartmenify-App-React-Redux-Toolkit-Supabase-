import React from 'react'
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
import AddNewFacility from './components/admin/facilities/AddNewFacility';
import Success from './components/auth/Success.jsx'
import UpdateApartment from './components/admin/apartments/UpdateApartment';
import UpdateReservation from './components/admin/reservations/UpdateReservation';
import Stats from './components/admin/stats/Stats.jsx'
// User components
import UserDashboard from './components/user/UserDashboard'
import SearcApartments from './components/user/SearchApartments';
import ApartmentDetails from './components/user/apartments/ApartmentDetails.jsx';
import ManageAccount from './components/user/userSettings/ManageAccount';
import UserReservations from './components/user/reservations/UserReservations';
import Wishlists from './components/user/wishlists/Wishlists';
import Wishlist from './components/user/wishlists/Wishlist';

// Toast messages component
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
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
          <Route path='addNewFacility' element={<AddNewFacility />} />
          <Route path='reservations' element={<Reservations />} />
          <Route path='reservations/:reservation' element={<UpdateReservation />} />
          <Route path='stats' element={<Stats />} />
        </Route>
        {/* User routes - should be public */}
        <Route path='/userDashboard' element={<UserDashboard />} >
          <Route path='apartments' element={<SearcApartments />} />
          <Route path='apartments/:apartment' element={<ApartmentDetails />} />
          <Route path='manageAccount' element={<ManageAccount />} />
          <Route path='reservations' element={<UserReservations />} />
          <Route path='wishlists' element={<Wishlists />} />
          <Route path='wishlists/:wishlist' element={<Wishlist />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
