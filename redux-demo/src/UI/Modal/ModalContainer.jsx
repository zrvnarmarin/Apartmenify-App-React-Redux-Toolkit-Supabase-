import React from 'react'

const ModalContainer = ({ children }) => {
  return (
    <div className='bg-[#861b1b] text-[#9e9a9b] text-2xl font-semibold w-96 max-w-[400px] rounded-md text-center p-4'>
        { children}
    </div>
  )
}

export default ModalContainer