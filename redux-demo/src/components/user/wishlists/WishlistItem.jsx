import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllWishlists, updateWishlist, deleteWishlist, selectIsLoading } from '../../auth/usersSlice'
import { openModal, selectIsModalOpen } from '../../../UI/modalSlice'
import LoadingSpinner from '../../../UI/Loading Spinner/LoadingSpinner'
import Modal from '../../../UI/Modal.jsx'
import { modalTexts } from '../../../data/modal/modalTexts'
import DeleteIcon from '../../../assets/action_icons/delete_icon.png'
import UpdateIcon from '../../../assets/action_icons/update_icon.png'

export const WishlistItem = ({ wishlistId, wishlistName, wishlistUserId }) => {
  const dispatch = useDispatch()

  const [isUpdateButtonPressed, setIsUpdateButtonPressed] = useState(false)
  const toggleWishlistUpdateState = () => setIsUpdateButtonPressed(prev => !prev)
  const cancelWishlistUpdate = () => setIsUpdateButtonPressed(false)

  const [updatedWishlist, setUpdatedWishlist] = useState(wishlistName)

  const loading = useSelector(selectIsLoading)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

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
    <div className='grid grid-cols-[repeat(auto-fit,minmax(200px, 1fr))] sm:grid-cols-3 hover:bg-slate-100 rounded-md
    text-slate-800 text-md font-normal py-2 px-4 md:py-8 md:px-16 shadow-lg border-[1px] border-slate-200 items-center'>

      { !isUpdateButtonPressed 
        ? <p className='font-semibold text-2xl text-center sm:text-start'>{wishlistName}</p>
        : 
          <input
            className='text-black'
            placeholder='Enter new wishlist..'
            type='text'
            value={updatedWishlist}
            onChange={e => setUpdatedWishlist(e.target.value)}
          />
      }

      { loading ? <LoadingSpinner /> : <></>}

      {/* Number of saved apartments */}
      <div className=''>
        <p className='font-semibold text-2xl flex flex-row items-center gap-2'>
          <span>0</span>
          <span className='font-medium text-xl'>apartments saved</span>
        </p>
      </div>

      {/* Buttons update and delete section*/}
      <div className='flex gap-4 items-center justify-end'>
        <button 
          className='p-4 text-xl text-white font-bold rounded-full bg-[#FF385C] shadow-2xl' 
          onClick={updateSelectedWishlist}
        >
          { isUpdateButtonPressed ? 'Save' : <img src={UpdateIcon} alt='update_icon' width={30} height={30} /> }
        </button>

        {
          !isUpdateButtonPressed ? 
          <button 
          className='p-4 text-xl text-white font-bold rounded-full bg-[#FF385C] shadow-2xl' 
          onClick={() => {
            dispatch(deleteWishlist({ id: wishlistId, userId: wishlistUserId, name: wishlistName }))
            console.log(wishlistId, wishlistName)
            toast.success('Wishlist has been deleted!')
          }}
        >
          <img src={DeleteIcon} width={30} height={30} alt="delete_wishlist_item" />
        </button>
        : <></>
        }

        { !isUpdateButtonPressed 
          ? 
            <></> 
          : 
            <button 
              className='p-4 text-xl text-white font-bold rounded-full bg-[#FF385C] shadow-2xl' 
              onClick={cancelWishlistUpdate} 
            >
              Cancel
            </button>
        }
      </div>

      {/* Modal for delete confirmation */}
      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteWishlist} 
          confirmAction={deleteSelectedWishlist} 
        />
      }
      
    </div>
  );
}

export default WishlistItem