import React from 'react'
import ApartmentInfo from './ApartmentInfo.jsx'
import Facilities from './Facilities';

const ApartmentTable = ({ apartments }) => {
  

  const tableHeaderData = [
    { id: '1', value: '#'}, { id: '2', value: 'Title'}, { id: '3', value: 'Status'}, { id: '4', value: 'City'}, { id: '5', value: 'Rooms'}, { id: '6', value: 'Price'}, { id: 7, value: ''}
  ]

  return (
    <>
      <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
        {tableHeaderData.map(headerData =>
          <div key={headerData.id}>{headerData.value}</div>
        )}
      
        
      </div>

      {apartments.map((apartment, index) =>
        <ApartmentInfo
          key={apartment.id}
          tableIndex={index} 
          title={apartment.title}
          status={apartment.status}
          city={apartment.city}
          rooms={apartment.rooms}
          price={apartment.price}
          description={apartment.description}
          address={apartment.address}
          doubleBeds={apartment.doubleBeds}
          singleBeds={apartment.singleBeds}
          distanceFromTheSea={apartment.distanceFromTheSea}
          facilities={apartment.facilities}
        />
      )}
    </>
  )
}

export default ApartmentTable