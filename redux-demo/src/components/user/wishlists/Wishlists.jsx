import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addWishlist, selectAllWishlists, setWishlist, selectWishlist, resetWishlist, getUser, 
  numberOfSavedApartmentsInEachWishlist } from '../../auth/usersSlice'
import { selectUser, getAllWishlists } from '../../auth/usersSlice';

const Wishlists = () => {
  const { id: userId } = useSelector(selectUser)
  const wishlist = useSelector(selectWishlist)
  const allWishlists = useSelector(selectAllWishlists) 

  const dispatch = useDispatch()
  const setNewWishlist = e => dispatch(setWishlist(e.target.value))
  // console.log(wishlist)

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

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllWishlists(userId))
  }, [dispatch])

  return (
    <div className='flex flex-col gap-6 px-6 py-12 bg-[#1F1F1F]'>
      <div className='flex flex-col ss:flex-row flex-wrap justify-between items-center gap-6'>
        <h1 className='text-3xl font-semibold text-[#f4eff0] text-center ss:text-left'>Wishlists</h1>
        <form onSubmit={submitFormHandler} className='flex flex-col ss:flex-row gap-4 w-full ss:w-fit'>
          <input
            type="text"
            placeholder="Add new wishlist.."
            className='bg-[#121212] text-[#f5f0f1] rounded-md px-6 py-2 outline-none focus:border-[1px] border-slate-500'
            value={wishlist}
            onChange={setNewWishlist}
          />
          <button className="px-6 py-2 my-4 ss:my-0 rounded-md text-lg font-medium bg-blue-100 text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54] drop-shadow-lg">
            Add New Wishlist
          </button>
        </form>
      </div>

      {apartmentCountInEachWishlist.map(([apartment, apartmentWishlistCount]) => 
        <div key={apartment} className='grid grid-cols-[repeat(auto-fit,minmax(200px ,1fr))] sm:grid-cols-3 p-2 gap-4 items-center rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'>
          <Link 
          to={`${apartment}`}
          key={apartment} 
          className='flex flex-col'
          // className='grid grid-cols-[repeat(auto-fit,minmax(200px ,1fr))] sm:grid-cols-3 p-2 gap-4 items-center rounded-md bg-[#121212] text-[#f5f0f1] text-md font-normal'
        >
          <div className='text-lg font-semibold'>{apartment}</div>
          <div>{apartmentWishlistCount} properties saved</div>
        </Link>
        <div className='justify-self-end flex flwx-row items-center gap-2'>
          <button 
            onClick={() => console.log('hej')} 
            className='z-10 px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
          >
            Update
          </button>
          <button 
            onClick={() => console.log('hej')} 
            className='z-10 px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
          >
            Delete
          </button>
        </div>
        </div>
      )}

    </div>
  )
}

export default Wishlists