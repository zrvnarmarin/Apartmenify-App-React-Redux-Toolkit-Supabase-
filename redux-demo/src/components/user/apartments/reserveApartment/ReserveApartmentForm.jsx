import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import supabase from '../../../../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { updateApartmentAvailability } from '../../../admin/apartments/apartmentsSlice';
import {
    addReservation, getReservationsByApartmentId, setName, setSurname,
    resetName, resetSurname, selectName, selectSurname, selectUserId, selectUserEmail, setUserId,
    setUserEmail, setDateRange as setRangeDate, allCurrentApartmentReservationsStartAndEndDates
}
from '../../../admin/reservations/reservationsSlice';

const APARTMENIFY_FEE = 34
const CLEANING_FEE = 45

const ReserveApartmentForm = ({ apartmentId, apartmentTitle, apartmentPrice }) => {
    const name = useSelector(selectName)
    const surname = useSelector(selectSurname)
    const userId = useSelector(selectUserId)
    const userEmail = useSelector(selectUserEmail)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const dispatch = useDispatch()
    const nameChangeHandler = e => dispatch(setName(e.target.value))
    const surnameChangeHandler = e => dispatch(setSurname(e.target.value))

    const submitFormHandler = (e) => {
        e.preventDefault()

        dispatch(addReservation({
            apartmentId: apartmentId,
            userId: userId,
            userEmail: userEmail,
            name: name,
            surname: surname,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: 'confirmed',
            apartmentTitle: apartmentTitle,
        }))

        dispatch(updateApartmentAvailability({ apartmentId: apartmentId, availability: 'reserved' }))

        resetForm()
        toast.success('Reservation successful!')
    }

    const resetForm = () => {
        dispatch(resetName())
        dispatch(resetSurname())
        setDateRange([])
    }

    useEffect(() => {
        supabase.auth.getUser().then(value => {
            // console.log(value.data.user.user_metadata) //check this one for full data on user
            dispatch(setUserId(value.data.user.id))
            dispatch(setUserEmail(value.data.user.email))
        })

        // Get all current reservations of current selected apartment from user
        dispatch(getReservationsByApartmentId(apartmentId))
    }, [])


    const allCurrentApartmentReservationsStartAndEndDatesIntervals = useSelector(allCurrentApartmentReservationsStartAndEndDates)
    console.log(allCurrentApartmentReservationsStartAndEndDatesIntervals, 'reserved intervals')

    return (
        <form onSubmit={submitFormHandler} className='flex flex-col gap-4 '>
            <input
                value={name}
                onChange={nameChangeHandler}
                type="text"
                placeholder='Name'
                className='shadow-xl rounded-md bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
            />
            <input
                value={surname}
                onChange={surnameChangeHandler}
                type="text"
                placeholder='Surname'
                className='shadow-xl rounded-md bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
            />
            <DatePicker
                className='shadow-xl rounded-md w-full bg-white text-slate-600 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
                placeholderText="Date"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={selectedDate => {
                    setDateRange(selectedDate)
                    dispatch(setRangeDate(JSON.stringify(selectedDate)))
                }}
                isClearable={true}
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                clearButtonTitle='Clear Dates'
                excludeDateIntervals={allCurrentApartmentReservationsStartAndEndDatesIntervals}
                // highlightDates={allReservedDates}
            />
            <button className='bg-[#FF385C] hover:bg-[#fd4e6e] text-white rounded-lg px-4 py-2 text-lg font-semibold shadow-2xl'>Reserve</button>
        </form>
    )
}

export default ReserveApartmentForm