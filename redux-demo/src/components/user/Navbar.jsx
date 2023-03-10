import React from 'react'
import { Link } from 'react-router-dom'
import LanguageSelect from './LanguageSelect'
import Logout from './../Logout';

const Navbar = () => {
  return (
    <nav className='border-[1px] border-black p-3 mb-3'>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <li>
          <Link to="apartments">Apartments</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
        <li>
          <LanguageSelect />
        </li>
        <li>
          <span className='flex items-center justify-center gap-2'>
            <img
              src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
              className='w-12 h-12 rounded-full border-2 border-black'
            />
            <span>Welcome back, Marin</span>
          </span>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar