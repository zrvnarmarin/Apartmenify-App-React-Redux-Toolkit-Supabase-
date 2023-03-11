import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import supabase from '../../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { addReservation, getReservationsByApartmentId } from '../reservationsSlice';

const ReserveApartment = ({ apartmentId }) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const nameChangeHandler = e => setName(e.target.value)
    const surnameChangeHandler = e => setSurname(e.target.value)

    const dispatch = useDispatch()

    const submitFormHandler = (e) => {
        e.preventDefault()

        dispatch(addReservation({
            apartmentId: apartmentId,
            userId: userId,
            userEmail: userEmail,
            name: name,
            surname: surname,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        }))

        resetForm()
    }

    const resetForm = () => {
        setName('')
        setSurname('')
        setDateRange([])
    }

    useEffect(() => {
        supabase.auth.getUser().then(value => {
            setUserId(value.data.user.id)
            setUserEmail(value.data.user.email)
        })
    }, [])

    const disableReservedDates = (date) => {
        const isDateBetweenReservationDates = date >= startDate && date <= endDate(Boolean)
        return isDateBetweenReservationDates ? <div>je</div> : <div>nije</div>
    }

    return (
        <form onSubmit={submitFormHandler} className='bg-blue-100 flex flex-col gap-4 '>
            <input value={name} onChange={nameChangeHandler} type="text" placeholder='Name' className='p-2 border-[1px] border-black' />
            <input value={surname} onChange={surnameChangeHandler} type="text" placeholder='Surname' className='p-2 border-[1px] border-black' />
            <DatePicker
                className="border-[1px] border-black p-2"
                placeholderText="Date"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={selectedDate => {
                    setDateRange(selectedDate)
                    console.log('selected date', selectedDate)
                }}
                isClearable={true}
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                clearButtonTitle='Clear Dates'
                highlightDates={[
                    new Date(2023, 4, 4),
                    new Date(2023, 4, 5),
                    new Date(2023, 4, 6)
                ]}
                // renderDayContents={disableReservedDates}
            />
            <button className='border-[1px] border-black p-2 bg-blue-100'>Reserve Apartment</button>
            <button type='button' onClick={() => {
                dispatch(getReservationsByApartmentId(apartmentId))
            }}>Display in console reservation</button>
        </form>
    )
}

export default ReserveApartment