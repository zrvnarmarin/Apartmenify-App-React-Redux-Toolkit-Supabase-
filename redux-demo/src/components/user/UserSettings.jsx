import React from 'react'
import { Link } from 'react-router-dom'
import { userSettingsLinks } from '../../data/userSettingsLinks'

const UserSettings = () => {
  return (
    <div className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px] border-black absolute bg-white '>
        {userSettingsLinks.map(link => 
            <Link to={`/userDashboard/${link.route}`} key={link.name}>
                {link.name}
            </Link>    
        )}        
    </div>
  )
}

export default UserSettings