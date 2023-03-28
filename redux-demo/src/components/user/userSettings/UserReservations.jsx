import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsByUserEmail, selectAllReservations } from './../../reservationsSlice';
import { selectUser } from '../../auth/usersSlice';

const UserReservations = () => {
  const { email } = useSelector(selectUser)
  const userReservations = useSelector(selectAllReservations)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReservationsByUserEmail(email))
  }, [dispatch])

  return (
    <div>
      Reservations
      {JSON.stringify(email)}
      {JSON.stringify('')}
      <div className='flex flex-col gap-3'>
        {userReservations.map(userReservation =>
          <div key={userReservation.id} className='border-[1px] border-black p-2'>
            start time: <span>{userReservation.startDate}</span>, 
            end time: <span>{userReservation.endDate}</span>, 
            apartment id: <span>{userReservation.apartmentId}</span>, 
            apartment name: <span>{userReservation.apartmentTitle}</span>, 
            is finished reservation : <span>{(userReservation.isCompleted.toString())}</span>
          </div>  
        )}
      </div>
    </div>
  )
}

export default UserReservations