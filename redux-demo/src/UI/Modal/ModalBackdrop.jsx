import React from 'react'

const ModalBackdrop = ({ children }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-10 flex items-center justify-center'>
      {children}
    </div>
  )
}

export default ModalBackdrop