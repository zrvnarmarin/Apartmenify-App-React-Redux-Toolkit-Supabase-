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

    return (
        <div style={sliderStyles}>
            <div style={slideStyles}>

            </div>
        </div>
  )
}

export default Imageslider