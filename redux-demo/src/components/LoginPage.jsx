import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div style={{ border: '1px solid black', padding: '5px'}}>
        <p>Login Page</p>
        <button>
            <Link to="/main">Enter App</Link>
        </button>
    </div>
  )
}

export default LoginPage