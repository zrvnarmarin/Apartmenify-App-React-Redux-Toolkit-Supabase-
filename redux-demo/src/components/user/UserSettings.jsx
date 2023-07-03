import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './layout/Logout.jsx'

const UserSettings = () => {
  return (
    <ul className='absolute top-9 right-8 p-4 w-52 flex flex-col gap-2 text-black rounded-lg border-[1px] border-slate-300 shadow-2xl bg-white '>
      <li className='text-xl text-slate-700 font-semibold '>
        <Link to={`/userDashboard/manageAccount`} className='hover:text-slate-500'>Manage Account</Link>
      </li> 
        <hr />
      <li>
        <Logout />
      </li>
    </ul>
  )
}

export default UserSettings