import React from 'react'
import Apartment from './Apartment.jsx'
import ApartmentTableHeader from './ApartmentTableHeader.jsx'

const ApartmentTable = ({ apartments }) => {

  return (
    <div>
      <ApartmentTableHeader />

      {apartments.map((apartment, tableIndex) =>
        <Apartment
          key={tableIndex}
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
          availability={apartment.availability}
        />
      )}
    </div>
  )
}

export default ApartmentTable