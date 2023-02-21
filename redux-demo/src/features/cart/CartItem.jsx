import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItem, increase, decrease } from './cartSlice'

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch()

  return (
    <article className='border-2 border-black rounded-md bg-blue-100 gap-4 flex flex-col p-2'>
      <div className='flex items-center justify-center'>
        <img width={100} src={img} alt={title} />
      </div>

      <div className='flex flex-col gap-4'>
        <h4>Title: {title}</h4>
        <h4 className='item-price'>Price: <span className='bg-yellow-100 p-1 rounded-md'>${price}</span></h4>
      </div>

      <div className='flex items-center justify-between'>
        <p>Quantity: {amount}</p>
        <div className='flex items-center gap-4'>
            <button onClick={() => dispatch(increase(id))} className='bg-blue-700 p-1 rounded-md text-white'>
                +
            </button>
            <button onClick={() => {
                if (amount === 1) 
                { 
                    dispatch(removeItem(id))
                    return
                }
                dispatch(decrease(id))
            }} className='bg-red-700 py-1 px-2 rounded-md text-white'>
                -
            </button>
        </div>
      </div>

      <button
       onClick={() => dispatch(removeItem(id))}
       className='bg-red-100 p-1 rounded-md uppercase border-[1px] border-black'>
          remove
        </button>
    </article>
  )
}

export default CartItem