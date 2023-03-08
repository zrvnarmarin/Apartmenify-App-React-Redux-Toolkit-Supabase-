import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navbar = () => {
  return (
    <nav className='border-[1px] border-black p-2 mb-2 ' >
      <ul className='flex flex-wrap items-center justify-around' >
        <li>
          <Link to="apartments">Apartments</Link>
        </li>
        <li>
          <Link to="facilities">Facilities</Link>
        </li>
        <li>
          <Link to="registeredUsers">Registered Users</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar