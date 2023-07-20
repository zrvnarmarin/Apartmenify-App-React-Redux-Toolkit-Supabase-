import React from 'react'

const ModalContainer = ({ children, isAdmin }) => {
  return (
    <div 
      className={
      `${ 
        isAdmin 
        ? 'bg-[#182028] text-[#f5eced] border-[1px] border-slate-600' 
        : ''
      } 
        text-xl font-semibold max-w-4xl rounded-md text-center flex flex-col
      `}>
      {children}
    </div>
  )
}

export default ModalContainer