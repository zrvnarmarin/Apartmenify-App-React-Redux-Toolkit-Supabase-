import React from 'react'
import ImagePlaceholder from '../../../assets/placeholder.webp'
import { openModal } from '../../../UI/modalSlice'
import { useDispatch } from 'react-redux'

const NotificationTab = () => {
  const dispatch = useDispatch()
  const openReviewModal = () => dispatch(openModal())
  
  return (
    <div className='absolute drop-shadow-2xl rounded-lg w-96 h-90 flex flex-col p-4 top-9 right-2 gap-2 border-[1px] border-slate-300 shadow-2xl bg-white z-50 text-base'>
      {[1,2,3].map(n => 
        <div key={n} className='flex flex-col gap-2 z-10'>
          <div className='p-4 gap-4 relative w-full flex flex-row items-center z-10'>
            <img src={ImagePlaceholder} alt="placeholder" className='w-12 h-12 rounded-full border-[1px] border-black z-10' />
            <div>
              <div>How was your staying in the <span className='font-medium'>Neki Smjestaj</span>? dfkjbh djklf fvdfohuioh dfgv</div>
              <button onClick={openReviewModal} className='underline text-[#FF385C] decoration-[#FF385C]'>Rate your experience</button>
            </div>
        </div>  <hr />
          </div>  
      )}
    </div>
  )
}

export default NotificationTab