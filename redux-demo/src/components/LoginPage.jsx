import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// TO DO: make this modular so that other accounts can be used

const LoginPage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      // if (event !== 'SIGNED_OUT') { navigate('/main/apartments') } 
      // else { navigate('/') }
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
          appearance={{ 
            style: {
              button: { 
                flex: 1,
                backgroundImage: "linear-gradient(to right, #e8132f, #fd3b54)",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "8px",
                paddingBottom: "8px",
                border: "none",
                borderRadius: "0.375rem",
                fontWeight: "500",
                color: "rgb(245 236 237 / 1)",
                marginTop: '5px',
                marginBottom: "5px"
              },
              anchor: {
                color: "#f4eff0"
              },
              label: {
                color: "#9e9a9b",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: "600"
              },
              input: {
                color: "#f5f0f1",
                backgroundColor:"#252525",
                borderRadius: "0.375rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                border: "none",
                outline: "none"
              }
            }
          }}
          providers={['google', 'linkedin', 'facebook', 'github']}
        />
      </div>
      
      <h1 className='text-2xl font-semibold'>
        To see public user dashboard, click 
        <Link to="/userDashboard/apartments" className="underline text-red-800"> here</Link>  (Testing Purposes)
      </h1>
    </div>
  )
}

export default LoginPage