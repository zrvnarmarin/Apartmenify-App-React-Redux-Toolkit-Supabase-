import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addWishlist, selectAllWishlists, setWishlist, selectWishlist, resetWishlist, getUser, numberOfSavedApartmentsInEachWishlist } 
  from '../../auth/usersSlice'
import { selectUser, getAllWishlists } from '../../auth/usersSlice';
import WishlistItem from './WishlistItem';
import RouteContainer from './../../admin/layout/RouteContainer';
import { Route } from 'react-router-dom';

const Wishlists = () => {
  const { id: userId } = useSelector(selectUser)
  const wishlist = useSelector(selectWishlist)
  const allWishlists = useSelector(selectAllWishlists) 

  const dispatch = useDispatch()
  const setNewWishlist = e => dispatch(setWishlist(e.target.value))

  const apartmentCountInEachWishlist = Object.entries(useSelector(numberOfSavedApartmentsInEachWishlist)) 

  const submitFormHandler = (e) => {
    e.preventDefault()

    dispatch(addWishlist({
      name: wishlist,
      userId: userId
    }))

    dispatch(resetWishlist())
    toast.success(`Wishlist ${wishlist} has been added to database!`)
  }

  // console.log(allWishlists)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllWishlists(userId))
  }, [dispatch])

  return (
    <RouteContainer>
      <div className='flex flex-col ss:flex-row flex-wrap justify-between items-center gap-6 text-slate-800'>
        <h1 className='text-3xl font-semibold text-center ss:text-left'>Wishlists</h1>
        <form onSubmit={submitFormHandler} className='flex flex-col ss:flex-row gap-4 w-full ss:w-fit'>
          <input
            type="text"
            placeholder="Add new wishlist.."
            className='shadow-xl rounded-full bg-white text-slate-800 text-lg font-semibold px-10 py-3 outline-none border-[1px] border-slate-300'
            value={wishlist}
            onChange={setNewWishlist}
          />
          <button className='bg-[#FF385C] text-white rounded-full px-10 py-3 text-lg font-semibold shadow-2xl'>
            Add New Wishlist
          </button>
        </form>
      </div>

      <main className='flex flex-col gap-4'>
        {allWishlists.map((wishlist, i) => 
          <div key={i}>
            <WishlistItem 
              wishlistId={wishlist.id} 
              wishlistName={wishlist.name} 
              wishlistUserId={wishlist.userId}
            />
          </div>
        )}
      </main>

    </RouteContainer>
  )
}

export default Wishlists
