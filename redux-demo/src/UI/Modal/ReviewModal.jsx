import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../modalSlice'
import StarRating from '../../components/user/ratings/StarRating'
import ModalBackdrop from './ModalBackdrop'
import ModalContainer from './ModalContainer'
import { selectRating, resetRating, selectComment, resetComment, setComment } from '../../components/user/ratings/ratingsSlice'
import { toast } from 'react-toastify';
import { generateRatingGrade } from '../../utils/utilityFunctions'

const ReviewModal = () => {
  const dispatch = useDispatch()

  const closeModalWindow = () => dispatch(closeModal())

  const userRating = useSelector(selectRating)
  const userComment = useSelector(selectComment)

  const setCurrentComment = comment => dispatch(setComment(comment))
  const resetCurrentRating = () => dispatch(resetRating())
  const resetCurrentComment = () => dispatch(resetComment())

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
          <p>{generateRatingGrade(userRating)}</p>
          <textarea 
            value={userComment}
            onChange={e => setCurrentComment(e.target.value)}
            required
            placeholder='Leave your comment here' 
            rows={6}
            className='p-2 border-[1px] border-slate-300 rounded-md' 
          />
          <div className='flex items-center justify-around mt-8'>
            <button 
              onClick={(e) => {
                formSubmitHandler(e)
                closeModalWindow()
                resetCurrentRating()
                resetCurrentComment()
                console.log(userRating)
                toast.info('Rating submited!')
              }} 
              className='px-6 py-2 rounded-md font-semibold w-full bg-[#FF385C] text-[#f5eced]'
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