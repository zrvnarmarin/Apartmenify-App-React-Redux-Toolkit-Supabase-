import React, { useEffect } from 'react'
import Navbar from './Navbar'
import CartContainer from './CartContainer'
import { calculateTotals, getCartItems } from './cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import { getIsOpen } from '../modal/modalslice'

const CartShop = () => {
  const cartItems = useSelector(getCartItems)
  const isOpenModal = useSelector(getIsOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <div>
        { isOpenModal && <Modal />}
        <Navbar />
        <CartContainer />
    </div>
  )
}

export default CartShop