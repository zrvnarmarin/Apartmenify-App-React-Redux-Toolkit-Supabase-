import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, getAllUsers } from '../../auth/usersSlice'
import UserTableHeader from './UserTableHeader';

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div className='pt-1'>
      <h1 className='text-3xl font-semibold text-[#f4eff0] mx-4 mt-4'>Registered Users</h1>
      <div className='flex flex-col flex-wrap gap-4'>

        <UserTableHeader />
        
        <div className='flex flex-col gap-4 mx-4 text-[#f5f0f1]'>
        {users.map((user, i) => 
          <div key={user.id} className='grid grid-cols-4 p-3 gap-4 bg-[#121212] rounded-md'>
            <p className='pl-2 text-[#f5eced] text-lg font-semibold'>{i}</p>
            <p>USER ID</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>  
        )}
        </div>
      </div>
    </div>
  )
}

export default Users