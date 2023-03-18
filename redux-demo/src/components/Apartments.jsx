import React, { useState, useEffect, useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FilterSortSection from './FilterSortSection'
import ApartmentTable from './ApartmentTable'
import { getApartmentsError, getApartmentsStatus, selectFilteredApartments, selectSortedApartments } from './apartmentsSlice'

const Apartments = () => {
  const { apartments } = useOutletContext()
  const apartmentsStatus = useSelector(getApartmentsStatus)
  const apartmentsError = useSelector(getApartmentsError)

  // const filteredApartments = useMemo(() => {
  //   return apartments.filter(apartment => {
  //     if (filter === 'All') {
  //       return apartments;
  //     }
  //     else if (filter === 'Title') {
  //       return apartment.title.toLowerCase().includes(filterQuery.toLowerCase());
  //     }
  //     else if (filter === 'Address') {
  //       return apartment.address.toLowerCase().includes(filterQuery.toLowerCase());
  //     } 
  //     else if (filter === 'City') {
  //       return apartment.city.toLowerCase().includes(filterQuery.toLowerCase());
  //     } 
  //     else {
  //       return apartments;
  //     }
  //   });
  // }, [apartments, filter, filterQuery]);

  const filteredApartmentsSlice = useSelector(selectFilteredApartments)
  const sortedApartmentsSlice = useSelector(selectSortedApartments)
  console.log(filteredApartmentsSlice)

  // const sortedApartments = useMemo(() => {
  //   const sorted = [...filteredApartments].sort((a, b) => {
  //     if (sortOption === 'id') {
  //       return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  //     } else if (sortOption === 'price') {
  //       return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  //     } else if (sortOption === 'rooms') {
  //       return sortOrder === 'asc' ? a.rooms - b.rooms : b.rooms - a.rooms;
  //     } else if (sortOption === 'city') {
  //       return sortOrder === 'asc' ? a.city.localeCompare(b.city) : b.city.localeCompare(a.city);
  //     }
  //   });
  //   return sorted;
  // }, [filteredApartments, sortOption, sortOrder]); 

  return (
    <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
      
      <div className='flex flex-row flex-wrap justify-between'>
      <h1 className='text-2xl'>Apartments</h1>
        <button className="p-2 bg-blue-50 border-[1px] border-black">
          <Link to="/main/addNewApartment">
            +Add New Apartment
          </Link>
        </button>
      </div>

      <FilterSortSection />

      {apartmentsStatus === 'loading' ? (
        <p>Loading...</p>
      ) : apartmentsStatus === 'failed' ? (
        <p>{apartmentsError}</p>
      ) : (
        <ApartmentTable apartments={apartments} />
      )}

    </div>
  )
}

export default Apartments