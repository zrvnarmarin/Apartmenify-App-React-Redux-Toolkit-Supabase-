import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reservationFilterOptions } from '../../../data/reservations/reservationFilterOptions';
import { selectReservationFilter, setReservationFilter, selectReservationFilterQuery, setReservationFilterQuery } from './reservationsSlice';

const ReservationFilterSection = () => {
  const dispatch = useDispatch()

  const reservationFilter = useSelector(selectReservationFilter)
  const reservationFilterChangeHandler = e => dispatch(setReservationFilter(e.target.value))

  const reservationFilterQuery = useSelector(selectReservationFilterQuery)
  const reservationFilterQueryChangeHandler = e => dispatch(setReservationFilterQuery(e.target.value))

  return (
    <div className='p-2 flex flex-wrap justify-between items-center text-[#F4EFF0]'>
      <label className='text-lg font-semibold' htmlFor="filter">Filter by: </label>
      <select
        value={reservationFilter}
        onChange={reservationFilterChangeHandler}
        id='filter'
        className='bg-[#1F262F] text-[#f5f0f1] px-6 py-2 outline-none border-[1px] border-slate-600'
      >
        {reservationFilterOptions.map(option =>
          <option key={option.id}>{option.value}</option>
        )}
      </select>
      { reservationFilter === 'apartment title' || reservationFilter === 'user' 
        ? 
          <div>
            <input
              value={reservationFilterQuery}
              onChange={reservationFilterQueryChangeHandler}
              type="text"
              placeholder='Enter filter value...'
              className='bg-[#252525] text-[#9e9a9b] rounded-md px-6 py-2 outline-none border-[1px] border-slate-600'
            />
          </div> 
        : 
          <></>
      }
    </div>
  )
}

export default ReservationFilterSection