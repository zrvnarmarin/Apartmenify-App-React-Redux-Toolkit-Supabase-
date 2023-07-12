import React from 'react'
import Review from './review/Review'

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
    <section className='flex flex-col gap-4'>
      {reviews.map(review => 
        <Review 
          key={review.id} 
          createdAt={review.createdAt} 
          reviewer={review.reviewer} 
          rating={review.rating} 
          comment={review.comment} 
        />  
      )}
    </section>
  )
}

export default ReviewContainer