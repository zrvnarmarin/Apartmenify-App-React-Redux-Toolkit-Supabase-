import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navbar = () => {
  return (
    <nav className='p-2 mb-2 bg-[#0f0f0f] font-medium text-[#f4eff0]'>
      <ul className='flex flex-wrap items-center justify-between'>
        <div className='flex flex-row gap-32 items-center '>
          <li className='ml-2'>
            <Link to="apartments">Apartments</Link>
          </li>
          <li>
            <Link to="facilities">Facilities</Link>
          </li>
          <li>
            <Link to="reservations">Reservations</Link>
          </li>
          <li>
            <Link to="registeredUsers">Users</Link>
          </li>
        </div>
        <div className='flex justify-end mr-2'>
          <li>
            <Logout />
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar