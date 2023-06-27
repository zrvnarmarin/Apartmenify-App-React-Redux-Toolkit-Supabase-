import React, { useState } from 'react'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'
import RatingStarEmpty from '../../../assets/rating_icons/rating_star_empty_icon.png'

const ratingNumbers = [ 1, 2, 3, 4, 5 ]

const Rating = () => {


  return (
    <div className='flex flex-row items-center gap-4'>
        {ratingNumbers.map(ratingNumber => 
            <RatingStar key={ratingNumber} ratingNumber={ratingNumber} />
        )}
    </div>
  )
}

export default Rating

export const RatingStar = ({ ratingNumber }) => {
    const [isStarHovered, setIsStarHovered] = useState(false)

    return (
        <span className='bg-red-200'>
            <img 
                alt="rating_star" 
                src={ isStarHovered ? RatingStarFilled : RatingStarEmpty } 
                width={30} 
                height={30} 
                onMouseEnter={() => {
                    setIsStarHovered(true)
                }} 
                onMouseLeave={() => {
                    setIsStarHovered(false)
                }}
            />
            {ratingNumber}
        </span>
    )
}