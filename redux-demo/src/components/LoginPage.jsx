import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

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
    <div className='border-2 border-black p-4'>
      <h1 className='text-6xl font-semibold text-center'>Apartmenify</h1>
      <div className='mt-32'>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['discord', 'google']}
        />
      </div>
      
      <hr />
      <h1 className='text-2xl font-semibold'>
        To see public user dashboard, click 
        <Link to="/userDashboard/apartments" className="underline text-red-800"> here</Link>  (Testing Purposes)
      </h1>
    </div>
  )
}

export default LoginPage