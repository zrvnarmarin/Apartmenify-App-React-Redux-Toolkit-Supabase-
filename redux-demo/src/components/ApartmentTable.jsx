import React from 'react'
import ApartmentTableHeader from './ApartmentTableHeader.jsx'
import ApartmentInfo from './ApartmentInfo.jsx'

const ApartmentTable = () => {
  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      <ApartmentTableHeader />
      <ApartmentInfo />
    </div>
  )
}

export default ApartmentTable