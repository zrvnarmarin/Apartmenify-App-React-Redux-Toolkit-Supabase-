import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './userSettings/Logout'
import LanguageSelect from '../user/userSettings/LanguageSelect'

const UserSettings = () => {
  return (
    <ul className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px] border-black absolute bg-white '>
      <li>
        <LanguageSelect />
      </li>
      <li>
        <Link to={`/userDashboard/manageAccount`}>Manage Account</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  )
}

export default UserSettings