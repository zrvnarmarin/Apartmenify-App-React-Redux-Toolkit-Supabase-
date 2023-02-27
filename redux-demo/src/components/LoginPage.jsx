import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
 
  return (
    <div style={{ border: '1px solid black', padding: '5px'}}>
      <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <input type="text" placeholder="Enter username" className='p-2 border-[1px] border-black' />
        <input type="text" placeholder="Enter password" className='p-2 border-[1px] border-black' />
        <button className='border-[1px] border-black p-2 bg-blue-50'>Log In</button>

        Log In Page
      </div>
      <Link to='/signup' className='underline text-blu-300'>Dont have an account yet? Sign up!</Link> <br /><br />
      <Link to='/main/apartments' className='underline text-blu-300'>enter app</Link>
    </div>
  )
}

export default LoginPage