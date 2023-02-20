import React from 'react'

const SignupPage = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
      <input type="text" placeholder="Enter username" className='p-2 border-[1px] border-black' />
      <input type="text" placeholder="Enter password" className='p-2 border-[1px] border-black' />
      <button className='border-[1px] border-black p-2 bg-blue-50'>Sign Up</button>

      Signup Page
    </div>
  )
}

export default SignupPage