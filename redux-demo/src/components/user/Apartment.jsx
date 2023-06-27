import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StarPlaceholder from '../../assets/starPlaceholder.png'
import supabase from '../../supabaseClient'
import { selectAllWishlists, selectUser, getAllApartmentIdsFromWishlist, getWishlistNameAndApartmentIds, selectWishlistNamesAndIds, selectIsLoading } from '../auth/usersSlice'

const Apartment = ({ id: apartmentId, title, city, price, singleBeds, doubleBeds, isApartmentLiked }) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const wishlists = useSelector(selectAllWishlists)

    const [isLikeButtonPressed, setIsLikeButtonPressed] = useState(false)
    const loading = useSelector(selectIsLoading)

    useEffect(() => {
        // [ { Europe: [1,2,3] }, { Asia: [5,6,7] } ]
        if (isLikeButtonPressed) {
            dispatch(getWishlistNameAndApartmentIds(user.id))
        }
    }, [isLikeButtonPressed])

    const wishlistNamesAndApartmentIds = useSelector(selectWishlistNamesAndIds)


    // svi trenutno lajkani apartmani u selektanoj wishlisti:
    // const likedApartments = useSelector(selectWishlistApartmentsId)
    // console.log(likedApartments)

    // const updateWishlist = async () => {
    //     const currentIds = await getAllApartmentsIdFromWishlist().then((res) => {
    //         return res
    //     }).then((res) => {
    //         console.log(res)
    //     })

    //     const { data, error } = await supabase
    //         .from('wishlists')
    //         .update({ apartmentsId: currentIds })
    //         .eq('userId', user.id)
    //         .eq('name', 'North America')
    //         return data

    // }

    return (
        <li className='flex flex-col items-start sm:grid grid-cols-[repeat(auto-fit,minmax(200px ,1fr))] sm:grid-cols-3 gap-4 border-[1px] border-black'>
            <div className='w-full h-full'>
                <img
                    src="https://exej2saedb8.exactdn.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-04-at-2.28.40-PM.png?strip=all&lossy=1&ssl=1"
                    className='flex-1 w-full h-full object-cover'
                />
            </div>

            <div className='flex flex-col gap-2 bg-slate-100 w-full h-full text-xl font-normal text-gray-900 capitalize'>
                <p>{title}</p>
                <div>
                    {[1, 2, 3, 4, 5].map(number => 
                        <img key={number} src={StarPlaceholder} width={30} height={30} alt="rating_star" className='inline-block' />
                    )}
                </div>
                <a href="" className='underline underline-offset-2 underline-blue-400'>{city}</a>
                <p>{singleBeds} single beds, {doubleBeds} double beds</p>
                <p className='text-green-700 uppercase'>Free <span className='lowercase'>Cancelation</span></p>
                <p>NO prepayment needed – pay at the property</p>
            </div>

            <div className='bg-slate-100 p-2 flex flex-col xs:flex-row xs:gap-16 sm:gap-2 justify-between items-start sm:flex-col h-full w-full text-xl font-normal text-gray-900 capitalize'>
                <div>
                    <div className='flex flex-row gap-2'>
                        <p className='self-center text-4xl rounded-xl bg-red-200 p-2'>8.9</p>
                        <div className='self-center '>
                            <p className='text-2xl'>Exceptional</p>
                            <p className='text-lg'>1,565 reviews</p>
                        </div>
                    </div>
                    <p>PRICE: {price} e</p>
                    <p>Includes taxes and charges</p>
                </div>
                
                <button className='w-full flex flex-row gap-2'>
                    <Link
                        to={`/userDashboard/apartments/${apartmentId}`}
                        state={{ apartmentId: apartmentId, apartmentTitle: title }}
                        className='p-2 border-[1px] border-black bg-blue-100 w-full'
                    >
                        See Availability
                    </Link>
                </button>
            </div>
            <div className='flex items-center justify-between gap-10'>
                <p>#{apartmentId}</p>
                <p>{isApartmentLiked(apartmentId) ? 'Liked' : 'Not liked'}</p>
            </div>

            <div className='flex flex-row gap-10'>
                <button onClick={() => {
                    setIsLikeButtonPressed(prev => !prev)
                    // console.log(isLikeButtonPressed)
                    // test()
                    // updateWishlist()
                    // getAllApartmentsIdFromWishlist()
                }}>{ isLikeButtonPressed ? 'Hide Wishlists' : 'Show Wishlists '}</button>
                
                { isLikeButtonPressed
                    ? <div>
                    {wishlistNamesAndApartmentIds.map((wishlist, i) => 
                        <div key={i}>
                            <label htmlFor="wishlistName">{wishlist.name}</label>
                            <input 
                                type='checkbox' 
                                id='wishlistName' 
                                value={wishlist.name} 
                                key={i} 
                                onChange={async (e) => {
                                    // console.log(wishlist.name)

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

export default Apartment
