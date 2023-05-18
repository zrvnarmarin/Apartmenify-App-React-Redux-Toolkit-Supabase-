import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { updateReservation } from './reservationsSlice';

const UpdateReservation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const reservationData = location.state
  const [reservation, setReservation] = useState(reservationData)

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const submitHandler = e => {
    e.preventDefault()

    const updatedReservation = {
      user: {
        userId: reservation.userId,
        userEmail: reservation.userEmail
      },
      name: reservation.name,
      surname: reservation.surname,
      startDate: startDate,
      endDate: endDate,
      reservationId: reservation.id
    }

    dispatch(updateReservation(updatedReservation))
    navigate('/adminDashboard/reservations')
    toast.info('Reservation has been updated!')
  }

  return (
    <div className='flex flex-col gap-2 p-2'>
      <p className='text-2xl'>Update Reservation <span className='rounded-full bg-red-100 p-2'>{reservation.id}</span></p> 
      <form onSubmit={submitHandler} className='grid grid-cols-2 gap-4'>
        <input 
          className='border-[1px] border-black p-2' 
          value={reservation.name} 
          type="text" 
          onChange={e => setReservation(prev => {return {...prev, name: e.target.value}})} 
        />
        <input 
          className='border-[1px] border-black p-2' 
          value={reservation.surname} 
          type="text" 
          onChange={e => setReservation(prev => {return {...prev, surname: e.target.value}})} 
        /> 
        <div className='col-span-1'>
          <DatePicker
            className="border-[1px] border-black p-2 w-full"
            placeholderText="Date"
            selectsRange={true}
            isClearable={true}
            dateFormat='dd.MM.yyyy'
            // minDate={new Date()}
            clearButtonTitle='Clear Dates'
            startDate={startDate}
            endDate={endDate}
            onChange={selectedDate => setDateRange(selectedDate)}
          />
        </div>
        <button
          className='border-[1px] border-black bg-blue-100'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateReservation