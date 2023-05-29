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
    <div className='flex flex-col gap-6 px-6 py-12'>

      <div className='flex flex-col gap-4 text-center ss:text-left'>
        <div>
          <span className='text-3xl font-semibold text-[#f4eff0]'>Update Reservation </span>
          <span className='text-3xl font-semibold text-[#f4eff0]'>#{reservation.id}</span>
        </div>
        <span className='text-xl font-normal text-[#f4eff0]'>{reservationData.apartmentTitle}</span>
      </div> 

      <form onSubmit={submitHandler} className='grid grid-cols-2 gap-4'>
        <input 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none focus:border-[1px] border-slate-500' 
          value={reservation.name} 
          type="text" 
          onChange={e => setReservation(prev => {return {...prev, name: e.target.value}})} 
        />
        <input 
          className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none focus:border-[1px] border-slate-500'
          value={reservation.surname} 
          type="text" 
          onChange={e => setReservation(prev => {return {...prev, surname: e.target.value}})} 
        /> 
        <div className='col-span-1'>
          <DatePicker
            className='w-full bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none focus:border-[1px] border-slate-500' 
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
          className='col-start-2 col-end-3 px-6 py-2 rounded-md font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateReservation