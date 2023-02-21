import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAmount, getCartItems, getTotal, getIsLoading } from './cartSlice';
import CartItem from './CartItem';
import { openModal } from '../modal/modalslice';

const CartContainer = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(getCartItems)
  const total = useSelector(getTotal).toFixed(2)
  const amount = useSelector(getAmount)
  const isLoading = useSelector(getIsLoading)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (amount < 1) {
    return <section className='flex flex-col items-center justify-center gap-6 text-xl font-bold mt-6'>
      <h2>Your bag</h2>
      <h4>is currently empty!</h4>
    </section>
  }

  return (
    <section className='flex flex-col items-center justify-center gap-6 text-xl font-bold bg-blue-300'>
      <header>
        <h2>Your bag:</h2>
      </header>
      { !isLoading && <div>
        {cartItems.map(item => 
          <CartItem 
            key={item.id} 
            {...item} 
          />
        )}
      </div>}
      <footer className='flex flex-col gap-4'>
        <hr />
        <h2>Total: <span>${total}</span></h2>
        <button onClick={() => dispatch(openModal())} className='bg-red-700 py-1 px-2 rounded-md text-white'>Clear Cart</button>
      </footer>
    </section>
  )
}

export default CartContainer