import React from 'react'
import { Link } from 'react-router-dom'
import SavedIcon from '../../assets/saved_apartments_icons/filled_heart_white_outer_stroke.png'
import UnsavedIcon from '../../assets/saved_apartments_icons/empty_heart_white_outer_stroke.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './../auth/usersSlice';

const Apartment = ({ id, title, description, city, rooms, price }) => {

  const [isApartmentSaved, setIsApartmentSaved] = useState(false)
  const toggleApartmentSavedStatus = () => setIsApartmentSaved(prev => !prev)

  const apartmentSavedStatusIcon = isApartmentSaved ? SavedIcon : UnsavedIcon

  const { id: userId } = useSelector(selectUser)

  useEffect(() => {
    console.log(userId, id)
  }, [])

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
                to={`/userDashboard/apartments/${id}`}
                state={{ apartmentId: id, apartmentTitle: title }}
                className='p-2 border-[1px] border-black bg-blue-100'
            >
                Reserve
            </Link>
        </div>
        <div onClick={() => {
            toggleApartmentSavedStatus()
        }} >
            <img src={apartmentSavedStatusIcon} />
        </div>
    </li>
  )
}

export default Apartment