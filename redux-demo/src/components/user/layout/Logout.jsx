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
    <button onClick={logoutUser} className='text-md text-slate-700 hover:text-slate-500 font-medium'> Logout </button>
  )
}

export default Logout