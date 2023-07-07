import React, { useState } from 'react'

const Imageslider = ({ slides }) => {
    const [currentIndex, setCurrentIndex]= useState(0)  

    const slideStyles = {
        backgroundImage: `url(${slides[currentIndex].url})`,
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    const sliderStyles = {
        height: '100%',
        position: 'relative'
    }

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        left: '32px',
        transform: 'translate(0, -50%)',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    }

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        right: '32px',
        transform: 'translate(0, -50%)',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer'
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>Left</div>
            <div style={rightArrowStyles} onClick={goToNext}>Right</div>

            <div style={slideStyles}></div>
        </div>
  )
}

export default Imageslider