import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectAllApartments } from './apartmentsSlice';
import ApartmentInfo from './ApartmentInfo';

const FacilityGroupedApartments = () => {
  const { facility } = useParams()
  const apartments = useSelector(selectAllApartments)

  const getFacilityApartmentsGroup = apartments => {
    let facilities = [];
    
    apartments.map(apartment => {
      apartment.facilities.forEach(facility => {
        let existingFacility = facilities.find(f => f.value === facility.value);
        if (existingFacility) {
          existingFacility.apartments.push(apartment);
        } else {
          facilities.push({ value: facility.value, apartments: [apartment] });
        }
      });
    });
    
    return facilities;
  }

  const getApartmentsWithSelectedFacility = () => {
    let apartmentsToShow = []

    getFacilityApartmentsGroup(apartments).map(apartment => {
      const { value, apartments } = apartment
      
      if (value === facility) {
        apartmentsToShow = apartments
      }
    })

    return apartmentsToShow
  }

  const apartmentsWithSpecifiedFacility = getApartmentsWithSelectedFacility().map((apartment, tableIndex) =>
    <ApartmentInfo
      key={apartment.id}
      id={apartment.id}
      tableIndex={tableIndex} 
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
  )

  return (
    <div>
      <div className='bg-red-400 text-4xl my-2'>Facility: {facility}</div>
      {apartmentsWithSpecifiedFacility}
    </div>
  )
}

export default FacilityGroupedApartments