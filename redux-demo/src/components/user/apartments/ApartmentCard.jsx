import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../../supabaseClient'
import { selectUser, getWishlistNameAndApartmentIds, selectWishlistNamesAndIds } from '../../auth/usersSlice'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'

const ApartmentCard = ({ id: apartmentId, title, city, price, singleBeds, doubleBeds, isApartmentLiked }) => {
    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const wishlistNamesAndApartmentIds = useSelector(selectWishlistNamesAndIds)
    
    const [isLikeButtonPressed, setIsLikeButtonPressed] = useState(false)

    useEffect(() => {
        if (isLikeButtonPressed) {
            dispatch(getWishlistNameAndApartmentIds(user.id))
        }
        setState(wishlistNamesAndApartmentIds)
    }, [isLikeButtonPressed])

    const [state, setState] = useState(wishlistNamesAndApartmentIds)
    useEffect(() => {
        console.log(state)
    }, [state])
    
    return (
        <li className='sm:grid drop-shadow-md gap-1 flex flex-col hover:bg-slate-50 rounded-md p-2'>
            {/* Image section */}
            <div className='w-full h-full'>
                <img
                    src="https://exej2saedb8.exactdn.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-04-at-2.28.40-PM.png?strip=all&lossy=1&ssl=1"
                    className='flex-1 w-full h-full object-cover rounded-xl'
                    alt='apartment_main_image'
                />
            </div>

            {/* About apartment section */}
            <div className='flex flex-col gap-2 text-xl text-gray-900 capitalize w-full'>

                {/* Title, city, beds */}
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='text-2xl font-semibold'>{title}</p>
                        <div className='flex items-center gap-1'>
                            <span className='text-base'>8.9</span>
                            <img src={RatingStarFilled} alt="rating_star_icon" width={15} height={15} className='pb-1' />
                        </div>
                    </div>
                    <a href="" className='text-slate-600 text-base underline decoration-1 underline-offset-2 underline-blue-400'>{city}</a>
                    <p className='text-base'>{singleBeds} single beds, {doubleBeds} double beds</p>
                </div>

                {/* Price, reviews and score (for bigger screens) */}
                <div className='flex flex-col gap-2'>
                    <div>
                        <p className='normal-case'>
                            <span className='font-semibold'>&euro;{price}</span> night
                        </p>
                        <p className='text-sm'>Includes taxes and charges</p>
                    </div>
                    <button className='bg-[#FF385C] hover:bg-[#fa3c5f] text-white rounded-lg px-4 py-2 text-lg font-semibold shadow-2xl'>
                        <Link
                            to={`/userDashboard/apartments/${apartmentId}`}
                            state={{ apartmentId: apartmentId, apartmentTitle: title }}
                        >
                            Reserve
                        </Link>
                    </button>
                </div>
            </div>

            {/* Test za spremanje u wishliste */}
            <div className='flex items-center justify-between gap-10'>
                <p>#{apartmentId}</p>
                {/* <p>{isApartmentLiked(apartmentId) ? 'Liked' : 'Not liked'}</p> */}
            </div>

            <div className='flex flex-row gap-10'>
                <button 
                    onClick={() => {
                        setIsLikeButtonPressed(prev => !prev)
                    }}
                >
                    { isLikeButtonPressed ? 'Hide Wishlists' : 'Show Wishlists '}
                </button>
                
                { isLikeButtonPressed
                    ? <div>
                    {wishlistNamesAndApartmentIds.map((wishlist, i) => 
                        <div key={i}>
                            <span>{Object.values(wishlist)}</span>
                            <label htmlFor="wishlistName">{wishlist.name}</label>
                            <input 
                                checked={wishlist.apartmentsId.includes(apartmentId)}
                                type='checkbox' 
                                id='wishlistName' 
                                value={wishlist.name} 
                                onChange={async (e) => {
                                    console.log(wishlist.name)

                                    //Find all current apartments ids in selected wishlist
                                    const currentApartmentsId = wishlistNamesAndApartmentIds.find(w => w.name === wishlist.name).apartmentsId
                                    console.log(currentApartmentsId)

                                    
                                    if (e.target.checked) {
                                        const { data, error } = await supabase
                                            .from('wishlists')
                                            .update({ apartmentsId: [...currentApartmentsId, apartmentId] })
                                            .eq('userId', user.id)
                                            .eq('name', wishlist.name)
                                            
                                        console.log(currentApartmentsId)
                                    } 
                                    else if (!e.target.checked) {
                                        const test = [...currentApartmentsId]
                                        test.length - 1

                                        const { data, error } = await supabase
                                            .from('wishlists')
                                            .update({ apartmentsId: test })
                                            .eq('userId', user.id)
                                            .eq('name', wishlist.name)

                                        console.log(currentApartmentsId)
                                    }
                                }}
                            />
                        </div>    
                    )}
                    </div>
                    : <></>
                }
            </div>
        </li>
    )
}

export default ApartmentCard
