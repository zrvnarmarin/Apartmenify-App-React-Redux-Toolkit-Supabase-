import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './userSettings/Logout'

const UserSettings = ({ user }) => {
  return (
    <ul className='absolute top-8 right-1 flex flex-col gap-2 text-black rounded drop-shadow-2xl bg-white '>
      <li>
        <Link to={`/userDashboard/manageAccount`}>Manage Account</Link>
      </li>
      <li className='self-end'>
        <Logout />
      </li>
    </ul>
  )
}

export default UserSettings