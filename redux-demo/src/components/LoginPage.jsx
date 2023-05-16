import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { supabaseAuthStyles } from '../styles/supabaseAuth'

// TO DO: make this modular so that other accounts can be used

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== 'SIGNED_OUT') { navigate('/main/apartments') } 
      else { navigate('/') }
    })

    supabase.auth.getUser().then(value => {
      if (value.data.user.email === '76marin76@gmail.com') {
        console.log('marin is here')
      } else { console.log('its not admin')}
    })

  }, [])

  return (
    <div className='bg-[#0f0f0f] p-4 w-[100vw] h-[100vh]'>
      <h1 className='text-6xl font-semibold text-center text-[#f4eff0] mt-16'>Apartmenify</h1>
      <div className='mt-16 bg-[#0f0f0f]  items-center justify-center'>
        <Auth
          supabaseClient={supabase}
          appearance={supabaseAuthStyles}
          providers={['google', 'linkedin', 'facebook', 'github']}
        />
      </div>
    </div>
  )
}

export default LoginPage