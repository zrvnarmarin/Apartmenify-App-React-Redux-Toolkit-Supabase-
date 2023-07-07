import React from 'react'
import Apartment from '../Apartment'

const ApartmentsGrid = ({ apartments }) => {
  return (
    <ul className='grid grid-col-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      { apartments.map(apartment =>
        <Apartment
          id={apartment.id}
          key={apartment.id}
          title={apartment.title}
          description={apartment.description}
          city={apartment.city}
          rooms={apartment.rooms}
          price={apartment.price}
          singleBeds={apartment.singleBeds}
          doubleBeds={apartment.doubleBeds}
          // isApartmentLiked={isApartmentLiked}
        />
      )}
    </ul>
  )
}

export default ApartmentsGrid