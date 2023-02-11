import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ApartmentTable from './ApartmentTable';

const MainPage = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid black'}}>
        <Navbar />
        <Outlet />
        Main Page
    </div>
  )
}

export default MainPage