import React from 'react'
import ImagePlaceholder from '../../../assets/placeholder.webp'
import { openModal } from '../../../UI/modalSlice'
import { useDispatch } from 'react-redux'

const NotificationTab = () => {
  const dispatch = useDispatch()
  const openReviewModal = () => dispatch(openModal())
  
  return (
    <div className='absolute drop-shadow-2xl rounded w-96 h-90 flex flex-col p-10 top-10 right-2 gap-2 bg-white z-50'>
        {[1,2,3].map(n => 
            <div key={n} className='flex flex-col gap-2 bg-green-200 z-10'>
                <div className='bg-red-400 border-2 border-black p-4 gap-2 relative w-full flex flex-row items-center z-10'>
                    <img src={ImagePlaceholder} alt="placeholder" className='w-12 h-12 rounded-full border-2 border-black z-10' />
                    <div>How was your staying in the <span>Neki Smjestaj</span>?</div>
                </div>  
                <button onClick={openReviewModal} className='bg-blue-400 border-2 border-black'>Rate your experience</button>
            </div>  
        )}
    </div>
  )
}

export default NotificationTab