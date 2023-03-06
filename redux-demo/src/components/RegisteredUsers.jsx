import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, getAllUsers } from './auth/usersSlice'

const RegisteredUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1>Registered Users</h1>
      {JSON.stringify(users)}
    </div>
  )
}

export default RegisteredUsers