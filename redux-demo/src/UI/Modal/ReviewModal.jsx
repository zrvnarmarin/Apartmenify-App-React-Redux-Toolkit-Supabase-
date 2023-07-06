import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../modalSlice'
import StarRating from '../../components/user/ratings/StarRating'
import ModalBackdrop from './ModalBackdrop'
import ModalContainer from './ModalContainer'

const ReviewModal = () => {
  const dispatch = useDispatch()

  const closeModalWindow = () => dispatch(closeModal())

  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log('submited data!')
  }

  return (
    <ModalBackdrop>
      <ModalContainer>
        <div className='flex flex-col gap-4'>
          <h1>Marin, how was your experience with [Some_apartment]?</h1>
          <StarRating />
          {/* /Ovdje renderaj rating score i napisi useru rijecima koji score je postigao i na temelju toga promijeni boju cijelog
          modala u boju te ocjene */}
          <p>Superb!</p>
          <textarea 
              required
              className='p-2 border-[1px] border-slate-300 rounded-md' 
              placeholder='Leave your comment here' 
              rows={6}
          />
          <div className='flex items-center justify-around mt-8'>
            <button 
              onClick={(e) => {
                  formSubmitHandler(e)
                  closeModalWindow()
              }} 
              className='px-6 py-2 rounded-md font-medium bg-[#FF385C] text-[#f5eced]'
            >
              <span>Rate This Property</span>
            </button>
          </div>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default ReviewModal