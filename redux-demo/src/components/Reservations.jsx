import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../UI/Loading Spinner/LoadingSpinner'
import { getAllReservations, selectAllReservations, selectIsLoading } from './reservationsSlice'

// TO DO: rezervacije prikazi kao listu; napravi filter rezervacija i sortiranje rezervacija; u reservations
// preseli sav kod iz ReserveApartment komponente u njen slice, dakle sve stateove; stavi mogucnost
// brisanja rezervacija; stavi mogucnost prikaza rezervacija by username, by email etc. 
// dobro promisli i razradi kako ce izgledati cijela komponenta i koju datu jos mogu izvuci iz usera
// kad je prijavljen na appu u trenutku rezervacije apartmana (pogledaj user metadata properti)

const Reservations = () => {
  const dispatch = useDispatch()
  const allReservations = useSelector(selectAllReservations)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(getAllReservations())
  }, [dispatch])

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
        <p>Reservations</p>
        {JSON.stringify(allReservations)}

    </div>
  )
}

export default Reservations