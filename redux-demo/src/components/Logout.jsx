import React from 'react'
import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate()

  const logoutUser = async () => {
        const { error } = await supabase.auth.signOut()
        navigate('/')
        console.log('ovo je data logout', data)
        if (error) {
            console.log('Error logging out:', error.message)
        } else {
            console.log('User logged out successfully')
        }
  }

  return (
    <button onClick={logoutUser} className='border-[1px] border-black p-2 bg-blue-100'>
        Logout
    </button>
  )
}

export default Logout