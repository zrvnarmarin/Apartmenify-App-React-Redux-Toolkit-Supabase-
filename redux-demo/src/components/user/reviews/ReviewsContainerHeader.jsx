import React from 'react'
import RatingStarFilledIcon from '../../../assets/rating_icons/rating_star_filled_icon.png'

const ReviewsContainerHeader = () => {
  return (
    <div className='flex items-center gap-3 text-slate-800 text-xl sm:text-3xl'>
        <img src={RatingStarFilledIcon} alt="rating_star_icon" width={25} height={25} />
        <span className='font-semibold'>9.3</span>
        <span>&#x2022;</span>
        <span className='font-semibold'>114 reviews</span>
    </div>
  )
}

export default ReviewsContainerHeader