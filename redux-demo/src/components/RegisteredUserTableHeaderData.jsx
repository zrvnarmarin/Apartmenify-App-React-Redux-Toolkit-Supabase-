import React from 'react'
import { registeredUsersTableData } from '../data/registeredUser'

const RegisteredUserTableHeaderData = () => {
  return (
    <div className='grid grid-cols-4 p-2 mt-8 mx-4 bg-[#121212] rounded-md'>
      {registeredUsersTableData.map(headerData =>
        <p className='text-[#f5eced] text-lg font-semibold pl-2' key={headerData.id}>{headerData.value}</p>
      )}
    </div>
  )
}

export default RegisteredUserTableHeaderData