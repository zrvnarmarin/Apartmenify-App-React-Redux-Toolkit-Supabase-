import React, { useState } from 'react'
import RatingStarFilled from '../../../assets/rating_icons/rating_star_filled_icon.png'
import RatingStarEmpty from '../../../assets/rating_icons/rating_star_empty_icon.png'
import { useDispatch } from 'react-redux'
import { setRating } from './ratingsSlice'

const ratingOptions = [
    { id: 1, value: 1, isHovered: false },
    { id: 2, value: 2, isHovered: false },
    { id: 3, value: 3, isHovered: false },
    { id: 4, value: 4, isHovered: false },
    { id: 5, value: 5, isHovered: false },
]

const StarRating = () => {
    const [ratingStars, setRatingNumbers] = useState(ratingOptions)

    const dispatch = useDispatch()
    const setApartmentRating = (ratingValue) => dispatch(setRating(ratingValue))

    return (
        <div className='flex flex-row items-center justify-between '>
            {ratingStars.map(ratingStar =>
                <button 
                    key={ratingStar.id}
                    onClick={() => {
                        console.log(ratingStar.value)
                        setApartmentRating(ratingStar.value)
                    }}
                    className='p-2'
                >
                    <img 
                        alt="rating_star" 
                        src={ ratingStar.isHovered ? RatingStarFilled : RatingStarEmpty } 
                        onMouseEnter={() => {
                            setRatingNumbers(prev => {
                                if (prev === undefined) return

                                return prev.map(star => {
                                    star.value <= ratingStar.value ? star.isHovered = true : star.isHovered = false
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
                </button>
            )}
        </div>
    )
}

export default StarRating