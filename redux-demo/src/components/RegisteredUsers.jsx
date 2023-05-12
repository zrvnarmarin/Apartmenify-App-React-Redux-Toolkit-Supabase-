import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, getAllUsers } from './auth/usersSlice'
import RegisteredUserTableHeaderData from './RegisteredUserTableHeaderData'

const RegisteredUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <h1>Registered Users</h1>

      <RegisteredUserTableHeaderData />

      <div className='grid grid-rows-4 p-2 border-[1px] border-black gap-2'>
        {/* {JSON.stringify(users)} */}
        {users.map((user, i) => 
          <div key={user.id} className='grid grid-cols-4 p-2 border-[1px] border-black gap-2'>
            <p>{i}</p>
            <p>USER ID</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>  
        )}
      </div>
      
    </div>
  )
}

export default RegisteredUsers