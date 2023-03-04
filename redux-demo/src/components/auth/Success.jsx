import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import supabase from '../../supabaseClient'


const Success = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
  
    useEffect(() => {
      console.log(supabase.auth.getSession().then(value => console.log(value.data.session.access_token)))
      const getUserData = async () => {
        await supabase.auth.getUser().then((value) => {
          // value.data.user
          if (value.data?.user) {
            console.log(value.data.user)
            setUser(value.data.user)
          }
        })
      }
  
      getUserData()
    }, [])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        navigate('/main/apartments')
      }, 65000)
  
      // Clean up the timeout on unmount
      return () => clearTimeout(timeout)
    }, [navigate])
  
    const signOutUser = async () => {
      const { error } = await supabase.auth.signOut()
      navigate('/')
    }
  
    return (
      <div className='flex flex-col gap-8 items-center justify-center'>
        <h1 className='text-6xl'>Apartmenify</h1>
        {Object.keys(user).length !== 0 
          ? 
            <div className='p-16 text-black flex flex-col gap-4'>
              <p className='text-4xl font-bold'>Login Successful</p>
              <p>Redirecting...</p>
              <p>{JSON.stringify(user.user_metadata.email)}</p>
            </div>
          : 
          <>
            <h1>User is not logged in!</h1>
            <button onClick={() => navigate('/')}>Go back home!</button>
          </>
        }
      </div>
    )
}

export default Success;