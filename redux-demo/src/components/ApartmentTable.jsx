import React from 'react'
import ApartmentInfo from './ApartmentInfo.jsx'

const ApartmentTable = () => {
  const tableHeaderData = [
    { id: '1', value: '#'}, { id: '2', value: 'Title'}, { id: '3', value: 'Status'}, { id: '4', value: 'City'}, { id: '5', value: 'Rooms'}, { id: '6', value: 'Price'}, { id: 7, value: ''}
  ]

  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      <>
        {tableHeaderData.map(headerData =>
          <div key={headerData.id}>{headerData.value}</div>
        )}
      </>
      <ApartmentInfo />
    </div>
  )
}

export default ApartmentTable