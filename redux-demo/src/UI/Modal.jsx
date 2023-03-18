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
    <aside className='fixed top-0 left-0 w-full h-full bg-black/75 z-10 flex items-center justify-center'>
        <div className='bg-white w-96 max-w-[400px] rounded-md text-center'>
            <h4>{modalText}</h4>
            <div>
                <button onClick={closeModalWindowAndExecuteConfirmAction}>Confirm</button>
                <button onClick={closeModalWindow}>Cancel</button>
            </div>
        </div>
    </aside>
  )
}

export default Modal

// ovo je custom modal