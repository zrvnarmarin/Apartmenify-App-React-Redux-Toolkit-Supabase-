import React from 'react'

const ReviewHeader = ({ createdAt, reviewer, reviewerImage }) => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <img 
        src={reviewerImage} 
        alt="reviewer_image" 
        className='w-12 h-12 rounded-full border-2 border-white' 
      />
      <div className=''>
        <p className='font-semibold text-slate-800 text-lg '>{reviewer}</p>
        <p className='font-normal text-gray-500'>{createdAt}</p>
      </div>
    </div>
  )
}

export default ReviewHeader