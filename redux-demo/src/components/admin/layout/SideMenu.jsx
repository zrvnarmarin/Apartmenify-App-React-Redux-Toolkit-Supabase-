import React from 'react'
import { Link } from 'react-router-dom'
import XButton from '../../../assets/X.svg'
import Logout from '../../Logout'

const SideMenu = ({ closeSideMenu }) => {
  return (
    <div className='font-poppins w-full h-[100%] bg-[#1f1f1f] fixed left-0 top-0 overflow-y-auto px-8 py-16 z-10'>
        <ul className='flex flex-col gap-16'>
            <li className='flex justify-end'>
                <button onClick={() => closeSideMenu()}>
                    <img src={XButton} alt="close_sideMenu_button" width={35} height={35} />
                </button>
            </li>
            <li className='flex flex-col items-center justify-center mb-16'>
                <Link to="apartments" className='text-4xl'>Apartmenify</Link>
            </li>
            <li className='tracking-wider flex flex-col items-center justify-center gap-16 text-3xl font-bold'>
                <Link to="facilities">Facilities</Link>
                <Link to="reservations">Reservations</Link>
                <Link to="stats">Stats</Link>
                <Link to="users">Users</Link>
            </li>
            <hr />
            <li className=''>
                <Logout />
            </li>
        </ul>
        
    </div>
  )
}

export default SideMenu