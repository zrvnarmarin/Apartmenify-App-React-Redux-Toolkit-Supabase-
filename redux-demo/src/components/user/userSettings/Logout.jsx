import React from 'react'
import supabase from '../../../supabaseClient'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate()

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut()
    navigate('/')
    if (error) {
      console.log('Error logging out:', error.message)
    } else {
      console.log('User logged out successfully')
    }
  }

  return (
    <div className='w-full'>
      <button
        onClick={logoutUser} 
        className='px-6 py-2 font-medium text-[#f5eced] bg-[#0C768A]'
      >
        Logout
      </button>
    </div>
  )
}

export default Logout