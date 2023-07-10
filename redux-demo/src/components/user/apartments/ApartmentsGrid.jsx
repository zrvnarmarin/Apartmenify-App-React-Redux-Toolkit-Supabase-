import React from 'react'
import ApartmentCard from './../ApartmentCard';

const ApartmentsGrid = ({ apartments }) => {
  return (
    <ul className='grid grid-col-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      { apartments.map(apartment =>
        <ApartmentCard
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