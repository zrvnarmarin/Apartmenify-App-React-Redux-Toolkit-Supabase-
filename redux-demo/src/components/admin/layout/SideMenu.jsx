import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../../Logout'
import XButton from '../../../assets/X.svg'

const SideMenu = ({ closeSideMenu }) => {
  return (
    <div className='font-poppins w-full h-[100%] bg-[#1f1f1f] fixed left-0 top-0 overflow-y-auto px-8 py-16 z-10'>
        <ul className='flex flex-col gap-16'>
            <li className='flex justify-end'>
                <button onClick={() => closeSideMenu()}>
                    <img 
                        src={XButton} 
                        alt="close_sideMenu_button" 
                        width={35} 
                        height={35} 
                        className='hover:rotate-180 duration-700'
                    />
                </button>
            </li>
            <li className='flex flex-col items-center justify-center mb-16'>
                <Link 
                    to="apartments" 
                    className='text-5xl hover:font-bold'
                >
                    Apartmenify
                </Link>
            </li>
            <li className='tracking-wider flex flex-col items-center justify-center gap-16 text-3xl font-bold'>
                <Link 
                    to="facilities" 
                    className='hover:underline hover:decoration-[#f0223d] decoration-2 underline-offset-[6px]'
                >
                    Facilities
                </Link>
                <Link 
                    to="reservations" 
                    className='hover:underline hover:decoration-[#f0223d] decoration-2 underline-offset-[6px]'
                >
                    Reservations
                </Link>
                <Link 
                    to="stats" 
                    className='hover:underline hover:decoration-[#f0223d] decoration-2 underline-offset-[6px]'
                >
                    Stats
                </Link>
                <Link 
                    to="users" 
                    className='hover:underline hover:decoration-[#f0223d] decoration-2 underline-offset-[6px]'
                >
                    Users
                </Link>
            </li>
            <hr />
            <li><Logout /></li>
            
        </ul>
        
    </div>
  )
}

export default SideMenu