import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllWishlists, updateWishlist, selectIsLoading } from '../../auth/usersSlice'
import LoadingSpinner from '../../../UI/Loading Spinner/LoadingSpinner'

export const WishlistItem = ({ wishlistId, wishlistName, wishlistUserId }) => {
  const dispatch = useDispatch()

  const [isUpdateButtonPressed, setIsUpdateButtonPressed] = useState(false)
  const toggleWishlistUpdateState = () => setIsUpdateButtonPressed(prev => !prev)
  const cancelWishlistUpdate = () => setIsUpdateButtonPressed(false)

  const [updatedWishlist, setUpdatedWishlist] = useState(wishlistName)

  const loading = useSelector(selectIsLoading)

  const updateSelectedWishlist = () => {
    toggleWishlistUpdateState()
      
    if (isUpdateButtonPressed) {
      dispatch(updateWishlist({
        name: updatedWishlist,
        userId: wishlistUserId,
        wishlistId: wishlistId
      }))

      dispatch(getAllWishlists(wishlistUserId))

      toast.success(`Wishlist updated!`)
    }
  }

  const deleteSelectedWishlist = () => {

  }

  useEffect(() => {
    if (!isUpdateButtonPressed) { 
      setUpdatedWishlist(wishlistName) 
    }
  }, [isUpdateButtonPressed, wishlistName])

  return (
    <div key={wishlistId}>
      { !isUpdateButtonPressed 
        ? <span>{wishlistName}</span>
        : 
          <input
            className='text-black'
            placeholder='Enter new wishlist..'
            type='text'
            value={updatedWishlist}
            onChange={e => setUpdatedWishlist(e.target.value)}
          />
      }

      <button 
        className='p-4 text-xl text-white font-bold bg-blue-400' 
        onClick={() => updateSelectedWishlist()}
      >
        { isUpdateButtonPressed ? 'Save' : 'Update'}
      </button>
      
      { !isUpdateButtonPressed 
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
      { loading ? <LoadingSpinner /> : <></> }
      <div>Updated Wishlist: {updatedWishlist}</div>
    </div>
  );
}

export default WishlistItem