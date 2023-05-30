import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LanguageSelect from './LanguageSelect'
import UserSettings from './UserSettings';
import { activeRouteStyles } from '../../styles/activeRouteStyles';
import PlaceholderImage from '../../assets/placeholder.webp'
import SideMenu from '../user/layout/SideMenu';
import HamburgerMenuButton from '../../assets/hamburgerMenu.png'
import LogoImage from '../../assets/logo.webp'

const Navbar = () => {
  const [isUserSettingsShown, setIsUserSettingsShown] = useState(false)
  const toggleUserSettings = () => setIsUserSettingsShown(prev => !prev)

  const [isOpenedSideMenu, setIsOpenedSideMenu] = useState(false)
  
  const closeSideMenu = () => setIsOpenedSideMenu(false)
  const toggleSideMenu = () => setIsOpenedSideMenu(prev => !prev)

  return (
    <nav className='bg-[#121212] text-[#f5eced] ss:text-xl sm:text-xl md:text-xl lg:2-xl py-3 px-6'>
      <ul className='flex flex-row justify-between items-center'>
        <li className='flex flex-row items-center'>
          <NavLink to="apartments" className=' md:block'>
            <img src={LogoImage} alt="logo_image" height={45} width={45} />
          </NavLink>
        </li>

        <li className='sm:flex hidden'>
          <div className='flex flex-row items-center gap-8 sm:gap-12'>
            <NavLink
              to="apartments"
              style={activeRouteStyles}
            >
              Apartments
            </NavLink>
            <NavLink
              to="reservations"
              style={activeRouteStyles}
            >
              Reservations
            </NavLink>
            <NavLink
              to="wishlists"
              style={activeRouteStyles}
            >
              Wishlists
            </NavLink>
          </div>
        </li>

        <li className='sm:flex hidden'>
          <NavLink 
            onClick={toggleUserSettings} 
            className='flex items-center justify-center gap-2 bg-blue-50 border-[1px] border-black p-2 rounded-lg'
          >
            <img
              src={PlaceholderImage}
              className='w-12 h-12 rounded-full border-2 border-black'
            />
            <span className='font-semibold'>John</span>
          </NavLink>

          { isUserSettingsShown && <UserSettings />}
        </li>

        <li className='block sm:hidden'>
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