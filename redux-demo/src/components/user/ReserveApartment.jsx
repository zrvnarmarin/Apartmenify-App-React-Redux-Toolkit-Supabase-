import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import supabase from '../../supabaseClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { addReservation, getReservationsByApartmentId, selectAllReservations } from '../reservationsSlice';
import { getDatesBetweenIntervals } from '../../utils/utilityFunctions';

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

    const allReservations = useSelector(selectAllReservations)

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

        toast.success('Reservation successful!')
    }

    const resetForm = () => {
        setName('')
        setSurname('')
        setDateRange([])
    }

    useEffect(() => {
        supabase.auth.getUser().then(value => {
            console.log(value.data.user.user_metadata.full_name)
            setUserId(value.data.user.id)
            setUserEmail(value.data.user.email)
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

        // console.log(allReservedDates)
        // console.log('DATEEE', date.toISOString())
        // TO DO: figure out how to paint red dates that have been reserved

        return <div>{dayOfMonth}</div>
    };

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
                onChange={selectedDate => setDateRange(selectedDate)}
                isClearable={true}
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                clearButtonTitle='Clear Dates'
                excludeDateIntervals={reservedDateIntervals}
                renderDayContents={renderDayContents}
            />
            <button className='border-[1px] border-black p-2 bg-blue-100'>Reserve Apartment</button>
            <button type='button' onClick={() => {
                console.log(reservedDateIntervals)
            }}>Display reservation intervals</button>
        </form>
    )
}

export default ReserveApartment