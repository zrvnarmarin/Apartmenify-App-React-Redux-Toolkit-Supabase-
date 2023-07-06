import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../modalSlice'
import ModalBackdrop from './ModalBackdrop.jsx'
import ModalContainer from './ModalContainer'

const ConfirmModal = ({ modalText, confirmAction, isAdmin }) => {
  const dispatch = useDispatch()

  const closeModalWindow = () => dispatch(closeModal())

  const closeModalWindowAndExecuteConfirmAction = () => {
    closeModalWindow()
    confirmAction()
  }

  return (
    <ModalBackdrop>
      <ModalContainer isAdmin={isAdmin}>
        <h4>{modalText}</h4>
        <div className='flex items-center justify-around mt-8'>
          <button 
            onClick={closeModalWindowAndExecuteConfirmAction} 
            className={`${ isAdmin ? 'bg-[#0C768A] text-[#f5eced]' : 'bg-[#FF385C] text-[#f5eced]' } px-6 py-2 rounded-md font-medium `}
          >
            <span>Confirm</span>
          </button>
          <button 
            onClick={closeModalWindow} 
            className={`${ isAdmin ? 'bg-[#0C768A] text-[#f5eced]' : 'bg-[#FF385C] text-[#f5eced]' } px-6 py-2 rounded-md font-medium `}
          >
            Cancel
          </button>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default ConfirmModal