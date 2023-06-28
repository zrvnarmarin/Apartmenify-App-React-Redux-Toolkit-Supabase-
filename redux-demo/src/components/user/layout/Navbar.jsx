import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import UserSettings from '../UserSettings';
import { activeRouteStyles } from '../../../styles/activeRouteStyles';
import HamburgerMenuButton from '../../../assets/hamburgerMenu.png'
import SideMenu from './SideMenu';
import { selectUser } from '../../auth/usersSlice';
import NotificationBellIcon from '../../../assets/notification_icons/notification_bell_icon.png'
import NotificationTab from './NotificationTab';

const Navbar = () => {
  const [isUserSettingsShown, setIsUserSettingsShown] = useState(false)
  const toggleUserSettings = () => setIsUserSettingsShown(prev => !prev)

  const [isNotificationTabShown, setIsNotificationTabShown] = useState(false)
  const toggleNotificationTab = () => setIsNotificationTabShown(prev => !prev)

  const [isOpenedSideMenu, setIsOpenedSideMenu] = useState(false)
  const closeSideMenu = () => setIsOpenedSideMenu(false)
  const toggleSideMenu = () => setIsOpenedSideMenu(prev => !prev)

  const user = useSelector(selectUser)

  return (
    <nav className='bg-[#121212] text-[#f5eced] ss:text-xl sm:text-xl md:text-xl lg:2-xl py-3 px-6'>
      <ul className='flex flex-row justify-between items-center'>
        <li className='flex flex-row items-center'>
          <NavLink to="apartments" className=' md:block'>
            <p className='italic'>Apartmenify</p>
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

        <li className='sm:flex items-center gap-8 hidden z-10'>
          <div className='relative'>
            <button onClick={toggleNotificationTab}>
              <span className='absolute bottom-6 left-3 text-sm rounded-full px-3 py-1 bg-red-500'>1</span>
              <img 
              src={NotificationBellIcon} 
              alt="notification_bell_icon" 
              width={30}
              height={30}
              />
            </button>
            { isNotificationTabShown && <NotificationTab />}
          </div>
          <NavLink 
            onClick={toggleUserSettings} 
            className='flex items-center justify-center gap-3 p-2 rounded-lg'
          >
            <img
              src={user?.user_metadata?.avatar_url}
              className='w-12 h-12 rounded-full border-2 border-white'
            />
            <span className='font-semibold'>{user?.user_metadata?.full_name}</span>
          </NavLink>

          <div className='relative bg-red-500 z-10'>
            { isUserSettingsShown && <UserSettings />}
          </div>
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