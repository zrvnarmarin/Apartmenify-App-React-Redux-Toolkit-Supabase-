import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './layout/Navbar';
import { getUser } from '../auth/usersSlice';
import ReviewModal from '../../UI/ReviewModal.jsx'
import { selectIsModalOpen } from '../../UI/modalSlice';

const UserDashboard = () => {
  const dispatch = useDispatch()
  const isReviewModalOpen = useSelector(selectIsModalOpen)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div className=' border-black border-[1px]'>
      <Navbar />
      <Outlet />
      { isReviewModalOpen && <ReviewModal /> }
    </div>
  )
}

export default UserDashboard