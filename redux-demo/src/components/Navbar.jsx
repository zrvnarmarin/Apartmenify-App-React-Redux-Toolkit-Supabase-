import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ border: '1px solid blue', padding: '5px', marginBottom: '5px'}}>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <li>
          <Link to="apartments">Apartments</Link>
        </li>
        <li>
          <Link to="facilities">Facilities</Link>
        </li>
        <li>
          <Link to="registeredUsers">Registered Users</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar