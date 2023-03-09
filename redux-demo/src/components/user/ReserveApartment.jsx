import React from 'react'
import DateRangePicker from '../../UI/DateRangePicker';

const ReserveApartment = () => {

  const submitFormHandler = (e) => {
    e.preventDefault()

  }

  return (
    <form onSubmit={submitFormHandler} className='bg-blue-100 flex flex-col gap-4 '>
        <input type="text" placeholder='Name' className='p-2 border-[1px] border-black' />
        <input type="text" placeholder='Surname' className='p-2 border-[1px] border-black' />
        <DateRangePicker />
        <button className='border-[1px] border-black p-2 bg-blue-100'>Reserve Apartment</button>
    </form>
  )
}

export default ReserveApartment