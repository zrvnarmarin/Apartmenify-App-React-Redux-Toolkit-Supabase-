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
    <aside className='fixed top-0 left-0 w-full h-full bg-black/30 z-10 flex items-center justify-center'>
        <div className='bg-white w-96 max-w-[400px] rounded-md text-center p-4'>
            <h4>{modalText}</h4>
            <div className='flex items-center justify-around'>
                <button onClick={closeModalWindowAndExecuteConfirmAction} className='p-2 border-black border-[1px] bg-blue-100'>Confirm</button>
                <button onClick={closeModalWindow} className='p-2 border-black border-[1px] bg-blue-100'>Cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal

// ovo je custom modal