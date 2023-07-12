import React from 'react'
import RatingStarFilledIcon from '../../../../assets/rating_icons/rating_star_filled_icon.png'

const ReserveApartmentHeader = ({ apartmentPrice}) => {
  return (
    <div className='flex items-center justify-between'>
        <p className='text-slate-800 text-xl sm:text-3xl font-semibold flex flex-row items-center gap-1'>
            <span>€</span>
            <span>{apartmentPrice}</span>
            <span className='text-lg font-normal text-gray-500'>night</span>
        </p>
        <div className='flex items-center gap-2 text-md font-normal text-gray-500'>
            <img src={RatingStarFilledIcon} alt="rating_star_icon" width={15} height={15} />
            <span className='font-semibold'>[9.3]</span>
            <span>&#x2022;</span>
            <span className='underline font-base'>[114] reviews</span>
        </div>
    </div>
  )
}

export default ReserveApartmentHeader