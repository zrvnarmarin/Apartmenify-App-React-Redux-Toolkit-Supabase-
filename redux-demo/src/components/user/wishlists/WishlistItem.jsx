import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllWishlists, updateWishlist } from '../../auth/usersSlice'

export const WishlistItem = ({ index, wishlist, wholeWishlist }) => {
  const [isUpdateButtonPressed, setIsUpdateButtonPressed] = useState(false)
  const toggleWishlistUpdateState = () => setIsUpdateButtonPressed(prev => !prev)
  const cancelWishlistUpdate = () => setIsUpdateButtonPressed(false)

  const loading = useSelector(selectIsLoading)

  const [updatedWishlist, setUpdatedWishlist] = useState(wishlist)

  const dispatch = useDispatch()
  const updateSelectedWishlist = (wishlistToUpdate) => {

  }

  useEffect(() => {
    if (!isUpdateButtonPressed) 
      setUpdatedWishlist(wishlist)
  }, [isUpdateButtonPressed, wishlist])

  return (
    <div key={index}>
      { !isUpdateButtonPressed 
        ? 
          <span>{wishlist}</span>
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
        onClick={() => {
          toggleWishlistUpdateState()
          console.log(updatedWishlist)
          
          if (isUpdateButtonPressed) {
            // console.log('updating the', updatedWishlist)
            // console.log(index)

            dispatch(updateWishlist({
              name: updatedWishlist,
              userId: wholeWishlist.userId,
              wishlistId: index
            }))

            // dispatch(getWishlist(index))
            dispatch(getAllWishlists(wholeWishlist.userId))
          }
        }}
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