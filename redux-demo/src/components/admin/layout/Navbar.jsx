import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../../Logout.jsx'
import HamburgerMenuButton from '../../../assets/hamburgerMenu.png'
import LogoImage from '../../../assets/logo.webp'
import SideMenu from './SideMenu.jsx'

const Navbar = () => {
  const [isOpenedSideMenu, setIsOpenedSideMenu] = useState(false)
  
  const openSideMenu = () => setIsOpenedSideMenu(true)
  const closeSideMenu = () => setIsOpenedSideMenu(false)
  const toggleSideMenu = () => setIsOpenedSideMenu(prev => !prev)

  return (
    <nav className='bg-[#121212] text-[#f5eced] md:text-xl lg:2-xl py-3 px-6'>
      <ul className='flex flex-row justify-between items-center'>
        <li className='flex flex-row items-center'>
          <Link to="apartments" className=' md:block'>
            <img src={LogoImage} alt="logo_image" height={45} width={45} />
          </Link>
        </li>
        <li className='ss:flex hidden'>
          <div className='flex flex-row items-center gap-8 sm:gap-12'>
            <Link to="apartments">Apartments</Link>
            <Link to="facilities">Facilities</Link>
            <Link to="reservations">Reservations</Link>
            <Link to="stats">Stats</Link>
            <Link to="users">Users</Link>
          </div>
        </li>
        <li className='hidden md:block'>
          <Logout />
        </li>
        <li className='block ss:hidden'>
          <button onClick={toggleSideMenu}>
            <img 
              className=''
              src={HamburgerMenuButton} 
              alt="hamburger_menu_button" 
              width={35} 
              height={35} 
            />
          </button>
        </li>
      </ul>
      { isOpenedSideMenu ? <SideMenu closeSideMenu={closeSideMenu} /> : <></>}
    </nav>
  )
}

export default Navbar