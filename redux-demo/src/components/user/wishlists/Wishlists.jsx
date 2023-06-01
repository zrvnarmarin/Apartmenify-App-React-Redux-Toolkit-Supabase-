import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addWishlist, selectAllWishlists, setWishlist, selectWishlist, resetWishlist, 
  getAllSavedApartments, getUser, selectAllSavedApartments, numberOfSavedApartmentsInEachWishlist 
} from '../../auth/usersSlice'
import { selectUser, getAllWishlists } from '../../auth/usersSlice';

const Wishlists = () => {
  const { id: userId } = useSelector(selectUser)
  const wishlist = useSelector(selectWishlist)
  const allWishlists = useSelector(selectAllWishlists) 

  const dispatch = useDispatch()
  const setNewWishlist = e => dispatch(setWishlist(e.target.value))
  // console.log(wishlist)

  const apartmentCountInEachWishlist = Object.entries(useSelector(numberOfSavedApartmentsInEachWishlist)) 
  // console.log(apartmentCountInEachWishlist)

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

      <div className='flex flex-row gap-2 items-center relative bg-[#1F1F1F]'>

        {/* Prozor koji se otvori i prikaze sve wishlistove trenutne i delete i update opcije */}
        <div>
          <div className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px]
          border-black absolute top-[25%] left-20 bg-white '
          >
            {apartmentCountInEachWishlist.map(([key, value]) => 
              <div key={key} className='flex row items-center gap-2'>
                <span>{key}:</span>
                <span className='rounded-full px-[6px] py-[1px] bg-slate-700 text-white'>{value}</span>
                <span className='p-2 bg-blue-100'>Update</span>
                <span className='p-2 bg-blue-100'>Delete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlists