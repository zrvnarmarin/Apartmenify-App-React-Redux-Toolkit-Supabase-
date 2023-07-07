import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { supabaseAuthStyles } from '../styles/supabaseAuthStyles'

// TO DO: make this modular so that other accounts can be used

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== 'SIGNED_OUT') { navigate('/adminDashboard/apartments') } 
      else { navigate('/') }
    })

    supabase.auth.getUser().then(value => {
      if (value.data.user.email === '76marin76@gmail.com') {
        console.log('marin is here')
      } else { console.log('its not admin')}
    })

  }, [])

  return (
    <div className='bg-[#0E1217] h-screen p-4 flex-1 font-sans flex flex-col items-center'>
      <h1 className='text-5xl sm:text-6xl font-semibold text-center text-[#ffffff] mt-32'>Apartmenify</h1>
      <div className='mt-32 px-4 items-center justify-center w-full max-w-xl border-[1px] bg-[#182028] border-slate-700 rounded-md'>
        <Auth
          supabaseClient={supabase}
          appearance={supabaseAuthStyles}
          providers={['google', 'facebook']}
        />
      </div>
    </div>
  )
}

export default LoginPage