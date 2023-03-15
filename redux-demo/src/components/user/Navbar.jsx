import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LanguageSelect from './LanguageSelect'
import Logout from './../Logout';
import UserSettings from './UserSettings';

const Navbar = () => {
  const [isUserSettingsShown, setIsUserSettingsShown] = useState(false)
  const toggleUserSettings = () => setIsUserSettingsShown(prev => !prev)

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
          <Link onClick={toggleUserSettings} className='flex items-center justify-center gap-2 bg-blue-50 border-[1px] border-black p-2 rounded-lg'>
            <img
              src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
              className='w-12 h-12 rounded-full border-2 border-black'
            />
            <span className='font-semibold'>Marin</span>
          </Link>
          { isUserSettingsShown && <UserSettings />}
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar