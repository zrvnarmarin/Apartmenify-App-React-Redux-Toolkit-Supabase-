import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../UI/Loading Spinner/LoadingSpinner'
import { getAllReservations, selectIsLoading, filteredReservations } from './reservationsSlice'
import ReservationStatusFilterSection from './ReservationStatusFilterSection';
import RouteContainer from '../layout/RouteContainer'
import ReservationsHeader from './ReservationsHeader'
import ReservationTable from './ReservationTable'

const Reservations = () => {
  const dispatch = useDispatch()

  const reservations = useSelector(filteredReservations)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(getAllReservations())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />

  return (
    <RouteContainer>
      <ReservationsHeader />
      <ReservationStatusFilterSection />
      <ReservationTable reservations={reservations} />
    </RouteContainer>
  )
}

export default Reservations