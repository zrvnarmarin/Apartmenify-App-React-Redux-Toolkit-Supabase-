import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== 'SIGNED_OUT') { navigate('/success') } 
      else { navigate('/') }
    })
  }, [])

  return (
    <div style={{ border: '1px solid black', padding: '5px', background: '#93adfe'}}>
      <Auth 
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['discord', 'google']}
      />
    </div>
  )
}

export default LoginPage