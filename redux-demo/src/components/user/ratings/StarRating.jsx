import React, { useState } from 'react'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'
import RatingStarEmpty from '../../../assets/rating_icons/rating_star_empty_icon.png'

const ratingArray = [
    { id: 1, value: 1, isHovered: false },
    { id: 2, value: 2, isHovered: false },
    { id: 3, value: 3, isHovered: false },
    { id: 4, value: 4, isHovered: false },
    { id: 5, value: 5, isHovered: false },
]

const StarRating = () => {
    const [ratingNumbers, setRatingNumbers] = useState(ratingArray)

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
                            setRatingNumbers(prev => {
                                if (prev === undefined) return

                                return prev.map(star => {
                                    star.value <= ratingNumber.value ? star.isHovered = true : star.isHovered = false
                                    return star
                                })
                            })
                        }} 
                        onMouseLeave={() => {
                            setRatingNumbers(prev => {
                                if (prev === undefined) return
                                
                                return prev.map(star => ({...star, isHovered: false}))
                            })
                        }}
                    />
                </span>
            )}
        </div>
    )
}

export default StarRating