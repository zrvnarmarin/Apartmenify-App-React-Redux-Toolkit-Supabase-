import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useDispatch } from 'react-redux';
import { updateReservation } from './reservationsSlice';

const UpdateReservation = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const reservationData = location.state
    const [reservation, setReservation] = useState(reservationData)

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    console.log(reservation.startDate)

    const submitHandler = e => {
        e.preventDefault()

        const updatedReservation = {
            user: {
                userId: reservation.userId,
                userEmail: reservation.userEmail
            },
            name: reservation.name,
            surname: reservation.surname,
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString()
        }

        dispatch(updateReservation(updatedReservation))
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
            />
            <DatePicker
                className="border-[1px] border-black p-2 w-full"
                placeholderText="Date"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={selectedDate => {
                    setDateRange(selectedDate)
                }}
                isClearable={true}
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                clearButtonTitle='Clear Dates'
                // excludeDateIntervals={reservedDateIntervals}
                // renderDayContents={renderDayContents}
            />
            <button className='border-[1px] border-black'>Submit</button>
        </form>
    </div>
  )
}

export default UpdateReservation