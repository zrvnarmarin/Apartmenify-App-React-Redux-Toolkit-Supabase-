import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format, addMonths, isSameMonth, addDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useDispatch } from 'react-redux';
import { updateReservation } from './reservationsSlice';

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
  
  let footer = <p>Please pick the first day.</p>

  if (range?.from) {
    if (!range.to) 
      footer = <p>{format(range.from, 'PPP')}</p>

    if (range.to) 
      footer = 
      <p className=''> 
        <span className='border-[1px] border-black'>{format(range.from, 'PPP')}</span>
          
        <span className='border-[1px] border-black'>{format(range.to, 'PPP')} </span>
      </p>
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

  return (
    <div>
      <p className='text-2xl p-2'>Update Reservation</p>
      <form onSubmit={submitHandler} className='grid grid-cols-3 gap-4'>
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
        /> <br />
        <DayPicker
          id="test"
          mode="range"
          defaultMonth={pastMonth}
          selected={range}
          footer={footer}
          onSelect={setRange}
          className='col-span-1 border-[1px] border-black'
        /> <br />
        <button className='border-[1px] border-black'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateReservation