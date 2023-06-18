import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addWishlist, selectAllWishlists, setWishlist, selectWishlist, resetWishlist, getUser, 
  numberOfSavedApartmentsInEachWishlist, 
  deleteWishlist} from '../../auth/usersSlice'
import { selectUser, getAllWishlists, updateWishlist } from '../../auth/usersSlice';
// import WishlistItem from './WishlistItem';

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

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllWishlists(userId))
  }, [dispatch])

  const deleteSelectedWishlist = (wishlistId, userId) => dispatch(deleteWishlist({
    wishlistId: wishlistId,
    userId: userId
  }))

  const updateSelectedWishlist = (wishlistId, userId) => {
    dispatch(updateWishlist({
      wishlistId: wishlistId,
      userId: userId
    }))
  }

  

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

      {allWishlists.map((wishlist, i) => 
      <WishlistItem 
      index={wishlist} 
      wishlist={wishlist.name} 
      />
        // <div key={i}>
        //   <div>
        //     {
        //       !isUpdateButtonPressed 
        //       ?
        //       <span>{wishlist.name}</span>
        //       : 
        //       <input 
        //           className='text-black'
        //           placeholder='Enter new wishlist..' 
        //           type='text' 
        //           value={updatedWishlist} 
        //           onChange={(e) => console.log('hej')}
        //         />
        //     }
        //     <button onClick={() => {
        //       toggleWishlistUpdateState()
        //       console.log(wishlist.name)
        //     }}>Press me</button>
        //   </div>
        // </div>
        // <div 
        //   key={i} 
        //   className='grid grid-cols-[repeat(auto-fit,minmax(200px ,1fr))] sm:grid-cols-3 p-2 gap-4 items-center rounded-md
        //    bg-[#121212] text-[#f5f0f1] text-md font-normal'
        // >
        //   <Link 
        //     to={`${wishlist.name}`}
        //     key={i} 
        //     className='flex flex-col'
        //   >
        //     {
        //       isUpdateButtonPressed 
        //       ? 
        //         <input 
        //           className='text-black'
        //           placeholder='Enter new wishlist..' 
        //           type='text' 
        //           value={updatedWishlist} 
        //           onChange={(e) => dispatch(setWishlist(e.target.value))}
        //         />
        //       :
        //         <div className='text-lg font-semibold'>
        //           {wishlist.name}
        //         </div>
        //     }
        //   </Link>
        //   <Link 
        //     to={`${wishlist.name}`}
        //     key={wishlist.id} 
        //     className='flex flex-col'
        //     >
        //     <div>Dummy number properties saved</div>
        //   </Link>
        // <div className='justify-self-end flex flwx-row items-center gap-2'>
        //   <button 
        //     onClick={() => {
        //       // updateSelectedWishlist(wishlist.id, wishlist.userId)
        //       // console.log('wishlist updated!')
        //       toggleWishlistUpdateState()
        //     }} 
        //     className='z-10 px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
        //   >
        //     Update
        //   </button>
        //   <button 
        //     onClick={() => {
        //       deleteSelectedWishlist(wishlist.id, wishlist.userId)
        //       // console.log(wishlist.id, wishlist.name)
        //     }} 
        //     className='z-10 px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
        //   >
        //     Delete
        //   </button>
        // </div>
        // </div>
      )}

    </div>
  )
}

export default Wishlists

export const WishlistItem = ({ index, wishlist }) => {
  const [isUpdateButtonPressed, setIsUpdateButtonPressed] = useState(false)
  const toggleWishlistUpdateState = () => setIsUpdateButtonPressed(prev => !prev)
  const cancelWishlistUpdate = () => setIsUpdateButtonPressed(false)

  const [updatedWishlist, setUpdatedWishlist] = useState(wishlist)

  useEffect(() => {
    if (!isUpdateButtonPressed) {
      setUpdatedWishlist(wishlist)
    }
  }, [isUpdateButtonPressed, wishlist])

  return (
    <div key={index}>
      {
        !isUpdateButtonPressed 
          ? 
            <span>{wishlist}</span>
          : 
            <input
              className='text-black'
              placeholder='Enter new wishlist..'
              type='text'
              value={updatedWishlist}
              onChange={(e) => {
                setUpdatedWishlist(e.target.value)
                console.log(updatedWishlist)
              }}
            />
      }
      <button 
        className='p-4 text-xl text-white font-bold bg-red-400' 
        onClick={toggleWishlistUpdateState}
      >
        { isUpdateButtonPressed ? 'Save' : 'Update'}
      </button>
      {
        !isUpdateButtonPressed 
          ? 
            <></> 
          : 
            <button 
              className='p-4 text-xl text-white font-bold bg-red-400' 
              onClick={cancelWishlistUpdate} 
            >
              Cancel
            </button>
      }
      <div>Updated Wishlist: {updatedWishlist}</div>
    </div>
  );
}

