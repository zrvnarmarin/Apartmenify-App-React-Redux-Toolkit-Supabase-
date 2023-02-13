import React from 'react'
import { tableHeaderData } from './../data/tableHeaderData';

const ApartmentTableHeader = () => {

  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
        {tableHeaderData.map(headerData =>
          <div key={headerData.id}>{headerData.value}</div>
        )}
    </div>

  )
}

export default ApartmentTableHeader