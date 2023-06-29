import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from './modalSlice'
import StarRating from '../components/user/ratings/StarRating'

const Modal = () => {
  const dispatch = useDispatch()

  const closeModalWindow = () => dispatch(closeModal())

  const formSubmitHandler = (e) => {
    e.preventDefault()
    console.log('submited data!')
  }

  return (
    <aside className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center'>
      <div className='bg-slate-100 text-[#9e9a9b] text-2xl font-semibold w-96 max-w-[400px] rounded-md text-center p-8 flex flex-col gap-6'>
        <h1>Marin, how was your experience with [Some_apartment]?</h1>
        <StarRating />
        {/* /Ovdje renderaj rating score i napisi useru rijecima koji score je postigao i na temelju toga promijeni boju cijelog
        modala u boju te ocjene */}
        <p>Superb!</p>
        <textarea 
            required
            className='p-2' 
            placeholder='Leave your comment here' 
            rows={6}
        />
        <div className='flex items-center justify-around mt-8'>
          <button 
            onClick={(e) => {
                formSubmitHandler(e)
                closeModalWindow()
            }} 
            className='px-6 py-2 rounded-md font-medium text-[#f5eced] bg-red-400'
          >
            <span>Rate This Property</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Modal