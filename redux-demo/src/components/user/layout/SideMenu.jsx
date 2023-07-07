import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../../user/userSettings/Logout'
import XButton from '../../../assets/X.svg'

const SideMenu = ({ closeSideMenu }) => {
  return (
    <div className='font-poppins w-full h-[100%] bg-white fixed left-0 top-0 overflow-y-auto px-8 py-16 z-10'>
        <ul className='flex flex-col gap-16'>
            <li className='flex justify-end'>
                <button aria-label='close_sidemenu' onClick={() => closeSideMenu()}>
                    <img 
                        src={XButton} 
                        alt="close_sideMenu_button" 
                        width={35} 
                        height={35} 
                        className='hover:rotate-90 duration-700'
                    />
                </button>
            </li>
            <li className='flex flex-col items-center justify-center mb-16'>
                <Link 
                    onClick={closeSideMenu}
                    to="apartments" 
                    className='text-[#FF385C] text-4xl sm:text-5xl italic font-bold'
                >
                    Apartmenify
                </Link>
            </li>
            <li className='tracking-wider flex flex-col items-center justify-center gap-16 text-3xl font-bold'>
                <Link 
                    onClick={closeSideMenu}
                    to="apartments" 
                    className='hover:underline hover:decoration-[#FF385C] text-slate-900 decoration-2 underline-offset-[6px] duration-300'
                >
                    Apartments
                </Link>
                <Link 
                    onClick={closeSideMenu}
                    to="reservations" 
                    className='hover:underline hover:decoration-[#FF385C] text-slate-900 decoration-2 underline-offset-[6px] duration-300'
                >
                    Reservations
                </Link>
                <Link 
                    onClick={closeSideMenu}
                    to="wishlists" 
                    className='hover:underline hover:decoration-[#FF385C] text-slate-900 decoration-2 underline-offset-[6px] duration-300'
                >
                    Wishlists
                </Link>
                <Link 
                    onClick={closeSideMenu}
                    to="manageAccount" 
                    className='hover:underline hover:decoration-[#FF385C] text-center text-slate-900 decoration-2 underline-offset-[6px] duration-300'
                >
                    Manage Account
                </Link>
            </li>
            <hr />
            <li><Logout /></li>
            
        </ul>
        
    </div>
  )
}

export default SideMenu