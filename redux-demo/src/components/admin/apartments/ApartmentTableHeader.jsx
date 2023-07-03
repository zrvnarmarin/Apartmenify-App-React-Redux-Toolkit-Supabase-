import React from 'react'
import { tableHeaderData } from '../../../data/tableHeaderData';

const ApartmentTableHeader = () => {

  return (
    <div className='hidden md:grid grid-cols-7 p-2 bg-[#182028]'>
      {tableHeaderData.map(headerData =>
        <p 
          className='text-[#f5eced] text-lg font-semibold' 
          key={headerData.id}
        >
          {headerData.value}
        </p>
      )}
    </div>
  )
}

export default ApartmentTableHeader