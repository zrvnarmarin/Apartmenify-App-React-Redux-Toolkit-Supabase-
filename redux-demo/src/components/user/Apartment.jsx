import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SavedIcon from '../../assets/saved_apartments_icons/filled_heart_white_outer_stroke.png'
import UnsavedIcon from '../../assets/saved_apartments_icons/empty_heart_white_outer_stroke.png'
import { selectUser, selectAllWishlists, deleteSavedApartment, selectAllSavedApartments, getAllSavedApartments, getUser } from './../auth/usersSlice';
import { getAllWishlistsByUserId, addSavedApartment } from './../auth/usersSlice';

const Apartment = ({ id: apartmentId, title, description, city, rooms, price }) => {

    const dispatch = useDispatch()
    const { id: userId } = useSelector(selectUser)

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (isLiked) {
            setIsLiked(true)
            dispatch(addSavedApartment({
                apartmentId: apartmentId,
                wishlistId: 36,
                userId: userId
            }))
            console.log('apartment is liked')
        } else {
            setIsLiked(false)
            dispatch(deleteSavedApartment({
                apartmentId: apartmentId,
                wishlistId: 36,
                userId: userId
            }))
            console.log('apartment is not liked')
        }

    }, [isLiked])

    return (
        <li className='flex gap-4 border-[1px] border-black items-center'>
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
                    to={`/userDashboard/apartments/${apartmentId}`}
                    state={{ apartmentId: apartmentId, apartmentTitle: title }}
                    className='p-2 border-[1px] border-black bg-blue-100'
                >
                    Reserve
                </Link>
            </div>

            <button 
                className='border-black border-[1px] bg-red-200 p-2' 
                onClick={() => {
                    setIsLiked(prev => !prev)
                }} 
            >
                { isLiked ? 'Unlike' : 'Like'}
            </button>
        </li>
    )
}

export default Apartment