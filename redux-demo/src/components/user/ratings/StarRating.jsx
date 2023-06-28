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

const StarRating = () => {
    const [ratingNumbers, setRatingNumbers] = useState(array)

    return (
        <div className='flex flex-row items-center gap-4'>
            {ratingNumbers.map(ratingNumber =>
                <span className='bg-red-200' key={ratingNumber.id}>
                    <img 
                        alt="rating_star" 
                        src={ ratingNumber.isHovered ? RatingStarFilled : RatingStarEmpty } 
                        width={30} 
                        height={30} 
                        onMouseEnter={() => {
                            console.log(ratingNumber.value)
        
                            setRatingNumbers(prev => {
                                if (prev === undefined) return
        
                                let filledStars = prev.map(star => {
                                    star.value <= ratingNumber.value ? star.isHovered = true : star.isHovered = false
                                    return star
                                })
        
                                console.log(filledStars)
                                return filledStars
                            })
                        }} 
                        onMouseLeave={() => {

                            setRatingNumbers(prev => {
                                // console.log(prev)
                                return prev
                            })
        
        
                        }}
                    />
                </span>
            )}
        </div>
    )
}

export default StarRating