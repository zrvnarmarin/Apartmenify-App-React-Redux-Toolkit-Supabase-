import React, { useState } from 'react'
import DotIconGray from '../../assets/dot_icon_gray.png'
import DotIconPink from '../../assets/dot_icon_pink.png'
import LeftArrowIcon from '../../assets/left_arrow_icon.png'
import RightArrowIcon from '../../assets/right_arrow_icon.png'

const ImageCarousel = ({ slides, showIndexedDots, showImageIndices }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPreviousSlide = () => {
    const isFirstLside = currentImageIndex === 0
    const newIndex = isFirstLside ? slides.length - 1 : currentImageIndex - 1

    setCurrentImageIndex(newIndex)
  }
  
  const gotToNextSlide = () => {
    const isLastSlide = currentImageIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1

    setCurrentImageIndex(newIndex)
  }

  return (
    <div className='relative flex flex-col justify-center items-center gap-2'>
      {/* Slides */}
      {slides.map((slide, slideIndex) =>
        <img 
          key={slideIndex}
          className={`w-full rounded-md ${slideIndex !== currentImageIndex ? 'hidden' : 'block'}`}
          src={slides[currentImageIndex].url} 
          alt="img" 
          width={500} 
          height={500} 
        />
      )}

      {/* Previous and next button */}
      <button 
        className='hidden ss:block font-bold text-lg absolute top-1/2 left-0' 
        onClick={goToPreviousSlide}
      >
        <img 
          src={LeftArrowIcon} 
          alt="left_arrow_icon" 
          className={`h-10 w-10 sm:h-12 sm:w-12`}
        />
      </button>
      <button 
        className='hidden ss:block font-bold text-lg absolute top-1/2 right-0' 
        onClick={gotToNextSlide}
      >
        <img 
          src={RightArrowIcon} 
          alt="right_arrow_icon" 
          className={`h-10 w-10 sm:h-12 sm:w-12`}
        />
      </button>

      {/* Indexed dots */}
      { showIndexedDots &&
        <div className='flex flex-row gap-2 items-center relative'>
          {slides.map((slide, slideIndex) => 
            <button 
            key={slideIndex} 
            onClick={() => {
              setCurrentImageIndex(slideIndex)
            }
            }>
              <img 
                src={currentImageIndex === slideIndex ? DotIconPink : DotIconGray} 
                alt="dot_icon" 
                width={20} 
                height={20} 
                className={`${currentImageIndex === slideIndex ? 'scale-125' : 'scale-100'}`}
              />
            </button>
          )}
        </div>
      }

      {/* ¸Image indices */}
      { showImageIndices && 
        <div>
          {currentImageIndex + 1} / {slides.length}
        </div>
      }
    </div>
  )
}

export default ImageCarousel