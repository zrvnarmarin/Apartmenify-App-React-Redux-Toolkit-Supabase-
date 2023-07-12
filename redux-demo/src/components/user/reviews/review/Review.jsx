import React from 'react'
import ReviewHeader from './ReviewHeader'
import ReviewComment from './ReviewComment'
import ReviewShowMoreSection from './ReviewShowMoreSection'
import PlaceholderImage from '../../../../assets/placeholder.webp'

const Review = ({ createdAt, reviewer, comment }) => {
  return (
    <section className='bg-slate-50 flex flex-col items-start gap-2 rounded-md p-2'>
        <ReviewHeader 
            createdAt={createdAt} 
            reviewer={reviewer} 
            reviewerImage={PlaceholderImage} 
        />
        <ReviewComment comment={comment} />
        <ReviewShowMoreSection />
    </section>
  )
}

export default Review