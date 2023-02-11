import React, { useState } from 'react'

const ApartmentInfo = () => {
  const [isOpenMoreDetailsSection, setISOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setISOpenMoreDetailsSection(prev => !prev)
  
  
  return (
    <>
      <div>1</div>
      <div>Sunny Apartment</div>
      <div>Free</div>
      <div>Zagreb</div>
      <div>3</div>
      <div>23.99 e</div>
      <div>
        <button onClick={toggleMoreDetailsSection}>Toggle</button>
      </div>
      { isOpenMoreDetailsSection && <div className='col-span-full'>
        <div className='flex items-center justify-between'>
          <p>Description:</p>
          <p>Neka deskripcija tamo</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Address:</p>
          <p>Neka adresa tamo</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Double beds:</p>
          <p>3</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Single beds:</p>
          <p>4</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Distance from the sea:</p>
          <p>2.5 km</p>
        </div>
        <div className='flex items-center justify-between'>
          <p>Facilities:</p>
          <div className='flex items-center justify-between gap-2'>
            <p>Wi-fi</p>
            <p>Refrigerator</p>
            <p>Pool</p>
            <p>Free Parking</p>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ApartmentInfo