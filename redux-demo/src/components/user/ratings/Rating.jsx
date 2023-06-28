import React, { useState } from 'react'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'
import RatingStarEmpty from '../../../assets/rating_icons/rating_star_empty_icon.png'

const array = [
    { id: 1, value: 1, isHovered: false },
    { id: 2, value: 2, isHovered: false },
    { id: 3, value: 3, isHovered: false },
    { id: 4, value: 4, isHovered: false },
    { id: 5, value: 5, isHovered: false },
]

const Rating = () => {
  return (
    <div className='flex flex-row items-center gap-4'>
        <RatingStar />
    </div>
  )
}

export default Rating

export const RatingStar = () => {
    const [ratingNumbers, setRatingNumbers] = useState(array)

    return (
        <>
            {ratingNumbers.map(ratingNumber =>
                <span className='bg-red-200' key={ratingNumber.id}>
                <img 
                    alt="rating_star" 
                    src={ ratingNumber.isHovered ? RatingStarFilled : RatingStarEmpty } 
                    width={30} 
                    height={30} 
                    onMouseEnter={() => {
                        // setIsStarHovered(true)
                        console.log(ratingNumber.value)
    
                        setRatingNumbers(prev => {
                            if (prev === undefined) return
    
                            let hoveredStars = prev.map(star => {
                                star.value <= ratingNumber.value ? star.isHovered = true : star.isHovered = false
                                return star
                            })
    
                            console.log(hoveredStars)
                            return hoveredStars
                        })
                    }} 
                    onMouseLeave={() => {
                        // setIsStarHovered(false)
                        // console.log(ratingNumber)
    
                        setRatingNumbers(prev => {
                            // console.log(prev)
                            return prev
                        })
    
    
                    }}
                />
            </span>
            )}
        </>
    )
}