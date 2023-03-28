import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsByUserEmail, selectAllReservations } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';

const UserReservations = () => {
  const { email } = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReservationsByUserEmail(email))
  }, [dispatch])

  return (
    <div>
      Reservations
      {JSON.stringify(email)}
      {JSON.stringify('')}
    </div>
  )
}

export default UserReservations