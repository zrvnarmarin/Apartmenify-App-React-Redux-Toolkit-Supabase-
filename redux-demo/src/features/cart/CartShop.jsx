import React, { useEffect } from 'react'
import Navbar from './Navbar'
import CartContainer from './CartContainer'
import { calculateTotals, fetchCartItems, getIsLoading } from './cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import { getIsOpen } from '../modal/modalslice'

const CartShop = () => {
  const cartItems = useSelector(fetchCartItems)
  const isOpenModal = useSelector(getIsOpen)
  const isLoading = useSelector(getIsLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [])
  

  // if (isLoading) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <div>
        { isOpenModal && <Modal />}
        <Navbar />
        <CartContainer />
    </div>
  )
}

export default CartShop