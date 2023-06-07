import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../../user/userSettings/Logout.jsx'
import HamburgerMenuButton from '../../../assets/hamburgerMenu.png'
import LogoImage from '../../../assets/logo.webp'
import SideMenu from './SideMenu.jsx'
import { activeRouteStyles } from '../../../styles/activeRouteStyles.js'

const Navbar = () => {
  const [isOpenedSideMenu, setIsOpenedSideMenu] = useState(false)
  
  const closeSideMenu = () => setIsOpenedSideMenu(false)
  const toggleSideMenu = () => setIsOpenedSideMenu(prev => !prev)

  return (
    <nav className='bg-[#121212] text-[#f5eced] ss: text-xl sm:text-xl md:text-xl lg:2-xl py-3 px-6'>
      <ul className='flex flex-row justify-between items-center'>

        <li className='flex flex-row items-center'>
          <NavLink to="apartments" className=' md:block italic'>
            Apartmenify
          </NavLink>
        </li>

        <li className='ss:flex hidden'>
          <div className='flex flex-row items-center gap-8 sm:gap-12'>
            <NavLink 
              to="apartments"
              style={activeRouteStyles} 
            >
              Apartments
            </NavLink>
            <NavLink 
              to="facilities"
              style={activeRouteStyles} 
            >
              Facilities
            </NavLink>
            <NavLink 
              to="reservations"
              style={activeRouteStyles} 
            >
              Reservations
            </NavLink>
            <NavLink 
              to="stats"
              style={activeRouteStyles} 
            >
              Stats
            </NavLink>
            <NavLink 
              to="users"
              style={activeRouteStyles} 
            >
              Users
            </NavLink>
          </div>
        </li>

        <li className='hidden md:block'>
          <Logout />
        </li>

        <li className='block ss:hidden'>
          <button aria-label='hamburger_menu' onClick={toggleSideMenu}>
            <img 
              src={HamburgerMenuButton} 
              alt="hamburger_menu_button" 
              width={35} 
              height={35} 
            />
          </button>
        </li>

      </ul>

      { isOpenedSideMenu 
        ? <SideMenu closeSideMenu={closeSideMenu} /> 
        : <></>
      }

    </nav>
  )
}

export default Navbar