import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from './modalSlice'

const Modal = ({ modalText, confirmAction }) => {
  const dispatch = useDispatch()

  const closeModalWindow = () => dispatch(closeModal())

  const closeModalWindowAndExecuteConfirmAction = () => {
    closeModalWindow()
    confirmAction()
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/20 z-10 flex items-center justify-center'>
      <div className='bg-[#182028] text-[#f5eced] text-xl font-semibold w-96 max-w-[400px] rounded-md text-center p-4'>
        <h4>{modalText}</h4>
        <div className='flex items-center justify-around mt-8'>
          <button 
            onClick={closeModalWindowAndExecuteConfirmAction} 
            className='px-6 py-2 rounded-md font-medium bg-[#0C768A]'
          >
            <span>Confirm</span>
          </button>
          <button 
            onClick={closeModalWindow} 
            className='px-6 py-2 rounded-md font-medium bg-[#0C768A]'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal

// ovo je custom modal