import React from 'react'
import { useParams, Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApartment, selectApartment } from '../apartmentsSlice';
import ApartmentDetails from './ApartmentDetails';

const Apartment = ({ id, title, description, city, rooms, price }) => {
  const dispatch = useDispatch()

//   const fetchApartment = id => {
//     dispatch(getApartment(id))
//   }

  return (
    <li className='flex gap-4 border-2 border-black items-center'>
        <img
            src="https://exej2saedb8.exactdn.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-04-at-2.28.40-PM.png?strip=all&lossy=1&ssl=1"
            className='w-32 h-32 border-[1px] border-black '
            />
        <div>
            <p>TITLE: {title}</p>
            <p>DESCRIPTION: {description}</p>
            <p>CITY: {city}</p>
            <p>ROOMS: {rooms} rooms</p>
        </div>
        <div>
            <p>8.9</p>
            <p>Exceptional</p>
            <p>PRICE: {price} e</p>
            <Link
                to={`/userDashboard/searchApartments/${id}`}
                className='p-2 border-2 border-black bg-blue-100'
                // onClick={() => fetchApartment(id)}
                state={{ apartmentId: id }}
            >
                Reserve
            </Link>
            <Outlet />
        </div>
    </li>
  )
}

export default Apartment