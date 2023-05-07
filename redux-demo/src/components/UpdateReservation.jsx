import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format, addMonths, isSameMonth, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useDispatch } from 'react-redux';
import { updateReservation } from './reservationsSlice';

import DatePicker from "react-datepicker";

const UpdateReservation = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const reservationData = location.state
  const [reservation, setReservation] = useState(reservationData)

  const pastMonth = new Date()

  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4)
  };
  
  const [range, setRange] = useState(defaultSelected)
  console.log(range)
  
  let footer = <p className='w-full p-2 text-2xl'>Please pick the first day.</p>

  if (range?.from) {
    if (!range.to) 
      footer = <p>{format(range.from, 'PPP')}</p>

    if (range.to) 
      footer = 
      <div className='bg-red-200 w-full p-2 text-lg'> 
        <span className='border-[1px] border-black'>{format(range.from, 'PPP')}</span>
          
        <span className='border-[1px] border-black'>{format(range.to, 'PPP')} </span>
      </div>
  }

  const submitHandler = e => {
    e.preventDefault()

    const updatedReservation = {
      user: {
        userId: reservation.userId,
        userEmail: reservation.userEmail
      },
      name: reservation.name,
      surname: reservation.surname,
      startDate: range.from,
      endDate: range.to
    }

    dispatch(updateReservation(updatedReservation))

    navigate('/main/reservations')
  }
//previous for forms tyle = grid grid-cols-3 gap-4
  return (
    <div className='flex flex-col gap-2 p-2'>

      <p className='text-2xl'>Update Reservation</p> 

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
        
        {/* <DayPicker
          id="test"
          mode="range"
          defaultMonth={pastMonth}
          selected={range}
          footer={footer}
          onSelect={setRange}
          className='border-[1px] border-black '
        /> */}
        <div className='col-span-1'>
          <DatePicker
            className="border-[1px] border-black p-2 w-full"
            placeholderText="Date"
            selectsRange={true}
            isClearable={true}
            dateFormat='dd.MM.yyyy'
            minDate={new Date()}
            clearButtonTitle='Clear Dates'
          />
        </div>
        <button className='border-[1px] border-black bg-blue-100'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateReservation