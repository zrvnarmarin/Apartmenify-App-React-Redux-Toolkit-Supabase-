import React from 'react'
import Review from './review/Review'
import RatingStarFilledIcon from '../../../assets/rating_icons/rating_star_filled_icon.png'

const reviews = [
  { id: 1, createdAt: 'April 2023', reviewer: 'Marin Zrvnar', rating: 5, comment: 'It was all good and magnificent.' },
  { id: 2, createdAt: 'January 2023', reviewer: 'John Smith', rating: 4, comment: 'Great experience overall.' },
  { id: 3, createdAt: 'June 2023', reviewer: 'Emily Johnson', rating: 5, comment: 'Highly recommended!' },
  { id: 4, createdAt: 'March 2023', reviewer: 'Alex Davis', rating: 4, comment: 'Had a wonderful time.' },
  { id: 5, createdAt: 'May 2023', reviewer: 'Sarah Thompson', rating: 5, comment: 'Exceeded my expectations.' },
  { id: 6, createdAt: 'February 2023', reviewer: 'Michael Brown', rating: 3, comment: 'Some improvements needed.' }
]

const ReviewContainer = () => {
  return (
    <section className='col-span-1 md:col-span-2 flex flex-col gap-6'>
      <div className='flex items-center gap-3 text-slate-800 text-xl sm:text-3xl'>
        <img src={RatingStarFilledIcon} alt="rating_star_icon" width={25} height={25} />
        <span className='font-semibold'>9.3</span>
        <span>&#x2022;</span>
        <span className='font-semibold'>114 reviews</span>
      </div>

      {reviews.map(review => 
        <Review 
          key={review.id} 
          createdAt={review.createdAt} 
          reviewer={review.reviewer} 
          comment={review.comment} 
        />  
      )}

      <button className='w-fit border-[1px] border-[#FF385C] text-[#FF385C] rounded-lg px-4 py-2 text-lg font-semibold shadow-2xl'>Show all 114 reviews</button>
    </section>
  )
}

export default ReviewContainer