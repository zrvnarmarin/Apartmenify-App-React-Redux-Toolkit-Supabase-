import React from 'react'
import ApartmentInfo from './ApartmentInfo.jsx'
import ApartmentTableHeader from './ApartmentTableHeader.jsx'

const ApartmentTable = ({ apartments }) => {

  return (
    <>
      <ApartmentTableHeader />

      {apartments.map((apartment, tableIndex) =>
        <ApartmentInfo
          key={apartment.id}
          id={apartment.id}
          tableIndex={tableIndex + 1} 
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