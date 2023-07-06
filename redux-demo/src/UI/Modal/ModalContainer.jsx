import React from 'react'

const ModalContainer = ({ children, isAdmin }) => {
  return (
    <div 
      className={
      `${ 
        isAdmin 
        ? 'bg-[#182028] text-[#f5eced] border-[1px] border-slate-600' 
        : 'bg-slate-50 border-[1px] border-slate-300'
      } 
        text-xl font-semibold w-96 max-w-[400px] rounded-md text-center p-4
      `}>
      {children}
    </div>
  )
}

export default ModalContainer