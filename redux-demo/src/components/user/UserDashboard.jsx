import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './layout/Navbar';
import { getUser } from '../auth/usersSlice';
import ReviewModal from '../../UI/Modal/ReviewModal.jsx'
import { selectIsModalOpen, selectModalType } from '../../UI/modalSlice';
import { getAllApartments } from '../admin/apartments/apartmentsSlice';

const UserDashboard = () => {
  const dispatch = useDispatch()
  const isReviewModalOpen = useSelector(selectIsModalOpen)
  const modalType = useSelector(selectModalType)

  useEffect(() => {
    dispatch(getAllApartments())
    dispatch(getUser())
  }, [dispatch])

  return (
    <div className='h-screen font-sans'>
      <Navbar />
      <Outlet />
      { isReviewModalOpen && modalType === 'review' && <ReviewModal /> }
    </div>
  )
}

export default UserDashboard