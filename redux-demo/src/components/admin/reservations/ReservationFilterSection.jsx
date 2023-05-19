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

  // TO DO: ovdje staviti date pickere za filtriranje datuma kasnije

  return (
    <div className='p-2 flex flex-wrap justify-between items-center'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div className='p-2 bg-[#121212] rounded-md flex flex-wrap justify-between items-center gap-4'>
          <label className='text-[#9e9a9b] text-lg font-semibold' htmlFor="filter">Filter by: </label>
          <select
            value={reservationFilter}
            onChange={reservationFilterChangeHandler}
            id='filter'
            className='bg-[#252525] text-[#f5f0f1] rounded-md px-6 py-2 outline-none'
          >
            {reservationFilterOptions.map(option =>
              <option key={option.id}>{option.value}</option>
            )}
          </select>
        </div>

        { reservationFilter === 'apartment title' || reservationFilter === 'user' 
            ? 
            <div>
                <input
                    value={reservationFilterQuery}
                    onChange={reservationFilterQueryChangeHandler}
                    type="text"
                    placeholder='Enter filter value...'
                    className='border-[1px] border-black p-1'
                />
            </div> 
            : <></>
        }
      </div>

    </div>
  )
}

export default ReservationFilterSection