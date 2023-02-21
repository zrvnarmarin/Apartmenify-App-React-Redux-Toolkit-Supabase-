import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from './cartSlice'
import { openModal, closeModal } from '../modal/modalslice'

const Modal = () => {
  const dispatch = useDispatch()

  return (
    <aside className='fixed top-0 left-0 w-full h-full bg-black/75 z-10 flex items-center justify-center'>
        Modal
        <div className='bg-white w-96 max-w-[400px] rounded-md text-center'>
            <h4>Remove all items from your shopping cart?</h4>
            <div>
                <button onClick={() => {
                    dispatch(clearCart())
                    dispatch(closeModal())
                }}>Confirm</button>
                <button onClick={() => dispatch(closeModal())}>Cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal