import React from 'react'
import { useSelector } from 'react-redux';
import { getAmount } from './cartSlice';

const Navbar = () => {
  const amount = useSelector(getAmount)

  return (
    <div className='p-4 bg-red-200 flex justify-between items-center'>
        <div>Navbar</div>
        <div className='p-2 rounded-md bg-green-300'>Items Amount: {amount}</div>
    </div>
  )
}

export default Navbar