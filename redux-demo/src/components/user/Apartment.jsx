import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import SavedIcon from '../../assets/saved_apartments_icons/filled_heart_white_outer_stroke.png'
import UnsavedIcon from '../../assets/saved_apartments_icons/empty_heart_white_outer_stroke.png'
import { selectUser, selectAllWishlists } from './../auth/usersSlice';
import { getAllWishlistsByUserId, addSavedApartment } from './../auth/usersSlice';
import UseComponentVisible from '../../hooks/UseComponentVisible';

const Apartment = ({ id: apartmentId, title, description, city, rooms, price }) => {

  const [isApartmentSaved, setIsApartmentSaved] = useState(false)
  const toggleApartmentSavedStatus = () => setIsApartmentSaved(prev => !prev)

  const [areWishlistsShown, setAreWishlistsShown] = useState(false)
  const showAllWishlists = () => setAreWishlistsShown(true)

  const apartmentSavedStatusIcon = isApartmentSaved ? SavedIcon : UnsavedIcon

  const { id: userId } = useSelector(selectUser)
  const allUserWishlists = useSelector(selectAllWishlists)

  const dispatch = useDispatch()

  const { ref, isComponentVisible, setIsComponentVisible } = UseComponentVisible(true);

  useEffect(() => {
    dispatch(getAllWishlistsByUserId(userId))
  }, [])

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

        <div 
            className='relative' 
            onClick={() => {
                toggleApartmentSavedStatus()

                if (allUserWishlists && allUserWishlists.length > 0) {
                    dispatch(addSavedApartment({
                        apartmentId: apartmentId,
                        wishlistId: allUserWishlists[allUserWishlists.length - 1].id,
                        userId: userId
                    }))
                }

            }} 
        >
            <img src={apartmentSavedStatusIcon} />
            {
                isApartmentSaved 
                ? <div className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px]
                border-black absolute top-8 left-0 bg-white w-60'
                >
                   <div className='flex flex-row items-center gap-1'>
                        <span>Saved To:</span>
                        <span>{allUserWishlists[allUserWishlists.length - 1].name}</span>
                   </div>
                   <hr />
                   <div className='flex flex-row items-center justify-between'>
                        <span>Change</span>
                        <button onClick={() => {
                            showAllWishlists()
                        }}>&darr;</button>
                   </div>
               </div>
               : ''
            }
        </div>
    </li>
  )
}

export default Apartment