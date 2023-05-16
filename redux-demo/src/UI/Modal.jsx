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
    <aside className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center'>
      <div className='bg-[#121212] text-[#9e9a9b] text-2xl font-semibold w-96 max-w-[400px] rounded-md text-center p-4'>
        <h4>{modalText}</h4>
        <div className='flex items-center justify-around mt-8'>
          <button 
            onClick={closeModalWindowAndExecuteConfirmAction} 
            className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
          >
            <span>Confirm</span>
          </button>
          <button 
            onClick={closeModalWindow} 
            className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-gradient-to-r from-[#e8132f] to-[#fd3b54]'
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Modal

// ovo je custom modal