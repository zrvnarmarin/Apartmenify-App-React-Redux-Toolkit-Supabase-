import React from 'react'
import { reservationFilterOptions } from './../data/reservations/reservationFilterOptions';
import { selectReservationFilter, setReservationFilter, selectReservationFilterQuery, setReservationFilterQuery } from './reservationsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ReservationFilterSection = () => {
  const dispatch = useDispatch()

  const reservationFilter = useSelector(selectReservationFilter)
  const reservationFilterChangeHandler = e => dispatch(setReservationFilter(e.target.value))

  const reservationFilterQuery = useSelector(selectReservationFilterQuery)
  const reservationFilterQueryChangeHandler = e => dispatch(setReservationFilterQuery(e.target.value))

  return (
    <div className='p-2 border-[1px] border-black flex flex-wrap justify-between items-center'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div>
          <label htmlFor="filter">Filter by: </label>
          <select
            value={reservationFilter}
            onChange={reservationFilterChangeHandler}
            id='filter'
            className='bg-blue-50 border-[1px] border-black outline-none'
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