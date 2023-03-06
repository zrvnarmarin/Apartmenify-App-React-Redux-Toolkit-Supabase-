import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    
      const getUsers = async () => {
        let { data, error } = await supabase
        .rpc('get_users')
    
        if (error) console.error(error)
        else console.log(data)
      }
      getUsers()


    
    supabase.auth.onAuthStateChange(async (event) => {
      if (event !== 'SIGNED_OUT') { navigate('/main/apartments') } 
      else { navigate('/') }
    })

    // return () => {
    //   data.unsubscribe();
    // };
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
    </div>
  )
}

export default LoginPage