import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllWishlists, updateWishlist, deleteWishlist, selectIsLoading } from '../../auth/usersSlice'
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice'
import LoadingSpinner from '../../../UI/Loading Spinner/LoadingSpinner'
import Modal from '../../../UI/Modal.jsx'
import { modalTexts } from '../../../data/modal/modalTexts'

export const WishlistItem = ({ wishlistId, wishlistName, wishlistUserId }) => {
  const dispatch = useDispatch()

  const [isUpdateButtonPressed, setIsUpdateButtonPressed] = useState(false)
  const toggleWishlistUpdateState = () => setIsUpdateButtonPressed(prev => !prev)
  const cancelWishlistUpdate = () => setIsUpdateButtonPressed(false)

  const [updatedWishlist, setUpdatedWishlist] = useState(wishlistName)

  const loading = useSelector(selectIsLoading)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  // console.log(wishlistId, wishlistName)

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
    console.log('wishlsita ce ti biti izbrisana!')
    console.log('ovo je wishlista', wishlistName, wishlistId)

    dispatch(deleteWishlist({ id: wishlistId, userId: wishlistUserId, name: wishlistName }))
  }

  useEffect(() => {
    if (!isUpdateButtonPressed) { 
      setUpdatedWishlist(wishlistName) 
    }
  }, [isUpdateButtonPressed, wishlistName])

  return (
    <div className='bg-red-800 p-4'>
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

      <div className='flex gap-4'>
        <button 
          className='p-4 text-xl text-white font-bold bg-blue-400' 
          onClick={updateSelectedWishlist}
        >
          { isUpdateButtonPressed ? 'Save' : 'Update'}
        </button>

        {
          !isUpdateButtonPressed ? 
          <button 
          className='p-4 text-xl text-white font-bold bg-red-400' 
          onClick={() => {
            dispatch(deleteWishlist({ id: wishlistId, userId: wishlistUserId, name: wishlistName }))
            console.log(wishlistId, wishlistName)
          }}
        >
          Delete
        </button>
        : <></>
        }
      </div>

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
      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteWishlist} 
          confirmAction={deleteSelectedWishlist} 
        />
      }
      <div>Updated Wishlist: {updatedWishlist}</div>
    </div>
  );
}

export default WishlistItem