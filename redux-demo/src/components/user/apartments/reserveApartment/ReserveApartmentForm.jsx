import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import supabase from '../../../../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { getDatesBetweenIntervals } from '../../../../utils/utilityFunctions';
import { updateApartmentAvailability } from '../../../admin/apartments/apartmentsSlice';
import {
    addReservation, getReservationsByApartmentId, selectAllReservations, setName, setSurname,
    resetName, resetSurname, selectName, selectSurname, selectUserId, selectUserEmail, setUserId,
    setUserEmail, setDateRange as setRangeDate
}
from '../../../admin/reservations/reservationsSlice';

const ReserveApartmentForm = ({ apartmentId, apartmentTitle, apartmentPrice }) => {
    const allReservations = useSelector(selectAllReservations)
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

        // Get all reservations on mount
        dispatch(getReservationsByApartmentId(apartmentId))
    }, [])

    const getReservedDateIntervals = () => {
        const intervals = allReservations.map(reservation => ({
            start: new Date(reservation.startDate.slice(0, 10)),
            end: new Date(reservation.endDate.slice(0, 10))
        }));

        // Add an interval for the day before the start date of each reservation
        const beforeIntervals = allReservations.map(reservation => ({
            start: new Date(reservation.startDate.slice(0, 10)).setDate(new Date(reservation.startDate.slice(0, 10)).getDate() - 1),
            end: new Date(reservation.startDate.slice(0, 10))
        }));

        return [...intervals, ...beforeIntervals];
    };

    const reservedDateIntervals = getReservedDateIntervals()

    const getStartAndEndDatesOfEachReservation = () => {
        const startAndEndReservedDates = allReservations.map(reservation => ({
            start: new Date(reservation.startDate.slice(0, 10)),
            end: new Date(reservation.endDate.slice(0, 10))
        }));

        return startAndEndReservedDates
    }

    const startAndEndDatesOfEachReservation = getStartAndEndDatesOfEachReservation();

    const renderDayContents = (dayOfMonth, date) => {
        // console.log(date) // format: Sun Feb 26 2023 00:00:00 GMT+0100 (Central European Standard Time)

        const allReservedDates = startAndEndDatesOfEachReservation
        .map(dates => getDatesBetweenIntervals(dates.start, dates.end))
        .flat(1)

        return <div>{dayOfMonth}</div>
    };

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
                    // console.log(selectedDate, 'selected date')
                    dispatch(setRangeDate(JSON.stringify(selectedDate)))
                }}
                isClearable={true}
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                clearButtonTitle='Clear Dates'
                excludeDateIntervals={reservedDateIntervals}
                renderDayContents={renderDayContents}
            />
            <button className='bg-[#FF385C] hover:bg-[#fd4e6e] text-white rounded-lg px-4 py-2 text-lg font-semibold shadow-2xl'>Reserve</button>
        </form>
    )
}

export default ReserveApartmentForm