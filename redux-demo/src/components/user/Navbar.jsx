import React from 'react'
import { Link } from 'react-router-dom'
import LanguageSelect from './LanguageSelect'

const Navbar = () => {
  return (
    <nav className='border-[1px] border-black p-3 mb-3'>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <li>
          <Link to="searchApartments">Search Apartments</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
        <li>
          <LanguageSelect />
        </li>
        <li>
          Welcome back, Marin
        </li>
        <li>
          <button className='p-2 border-2 border-black bg-blue-100'>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar