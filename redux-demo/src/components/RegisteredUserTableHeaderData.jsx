import React from 'react'
import { registeredUsersTableData } from '../data/registeredUser'

const RegisteredUserTableHeaderData = () => {
  return (
    <div className='grid grid-cols-4 p-2 my-2 border-[1px] border-black'>
      {registeredUsersTableData.map(headerData =>
        <div key={headerData.id}>{headerData.value}</div>
      )}
    </div>
  )
}

export default RegisteredUserTableHeaderData