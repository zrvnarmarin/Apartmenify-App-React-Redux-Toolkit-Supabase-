import React, { useState } from 'react'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'
import RatingStarEmpty from '../../../assets/rating_icons/rating_star_empty_icon.png'

const ratingNumbers = [
    { id: 1, value: 1, isHovered: false },
    { id: 2, value: 2, isHovered: false },
    { id: 3, value: 3, isHovered: false },
    { id: 4, value: 4, isHovered: false },
    { id: 5, value: 5, isHovered: false },
]

const Rating = () => {

  return (
    <div className='flex flex-row items-center gap-4'>
        {ratingNumbers.map(ratingNumber => 
            <RatingStar key={ratingNumber.id} ratingNumber={ratingNumber.value} />
        )}
    </div>
  )
}

export default Rating

export const RatingStar = ({ ratingNumber }) => {
    const ratingNumbers = [
        { id: 1, value: 1, isHovered: false },
        { id: 2, value: 2, isHovered: false },
        { id: 3, value: 3, isHovered: false },
        { id: 4, value: 4, isHovered: false },
        { id: 5, value: 5, isHovered: false },
    ]
    const [isStarHovered, setIsStarHovered] = useState(false)
    const [numbers, setRatingNumbers] = useState(ratingNumbers)

    return (
        <span className='bg-red-200'>
            <img 
                alt="rating_star" 
                src={ isStarHovered ? RatingStarFilled : RatingStarEmpty } 
                width={30} 
                height={30} 
                onMouseEnter={() => {
                    setIsStarHovered(true)
                    console.log(ratingNumber)

                    setRatingNumbers(prev => {
                        if (prev === undefined) return

                        let hoveredStars = prev.slice(0, ratingNumber).map(star => ({ ...star, isHovered: true }));

                        // it works on hover, but find a way to display it on component level
                        console.log(hoveredStars)
                        return hoveredStars
                    })
                }} 
                onMouseLeave={() => {
                    setIsStarHovered(false)
                    console.log(ratingNumber)

                    setRatingNumbers(prev => {
                        console.log(prev)
                        return prev
                    })


                }}
            />
            {ratingNumber}
        </span>
    )
}