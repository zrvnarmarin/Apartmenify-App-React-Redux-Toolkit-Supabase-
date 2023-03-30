import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SavedIcon from '../../assets/saved_apartments_icons/filled_heart_white_outer_stroke.png'
import UnsavedIcon from '../../assets/saved_apartments_icons/empty_heart_white_outer_stroke.png'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './../auth/usersSlice';
import { getAllWishlistsByUserId } from './../auth/usersSlice';
import UseComponentVisible from '../../hooks/UseComponentVisible';

const Apartment = ({ id, title, description, city, rooms, price }) => {

  const [isApartmentSaved, setIsApartmentSaved] = useState(false)
  const toggleApartmentSavedStatus = () => setIsApartmentSaved(prev => !prev)
  const apartmentSavedStatusIcon = isApartmentSaved ? SavedIcon : UnsavedIcon

  const { id: userId } = useSelector(selectUser)

  const dispatch = useDispatch()

  const { ref, isComponentVisible, setIsComponentVisible } = UseComponentVisible(true);


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

        <div 
            className='relative' 
            onClick={() => {
                toggleApartmentSavedStatus()

                if (!isApartmentSaved) { dispatch(getAllWishlistsByUserId(userId)) }
// TO DO: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
//get the ref working when user clicks outside 
            }} 
        >
            <img src={apartmentSavedStatusIcon} />
            {
                isApartmentSaved 
                ? <div ref={ref} className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px]
                border-black absolute top-8 left-0 bg-white w-60'
                >
                   <span>Saved to: Wishlist Name</span>
               </div>
               : ''
            }
        </div>
    </li>
  )
}

export default Apartment