import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ReserveApartment = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const nameChangeHandler = e => setName(e.target.value)
    const surnameChangeHandler = e => setSurname(e.target.value)

    const submitFormHandler = (e) => {
        e.preventDefault()

        console.log(typeof(startDate))
        console.log('name: ', name)
        console.log('surname: ', surname)
        console.log('start date: ', startDate)
        console.log('end date: ', endDate)

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
                onChange={update => setDateRange(update)}
                isClearable={true}
            />
            <button className='border-[1px] border-black p-2 bg-blue-100'>Reserve Apartment</button>
        </form>
    )
}

export default ReserveApartment