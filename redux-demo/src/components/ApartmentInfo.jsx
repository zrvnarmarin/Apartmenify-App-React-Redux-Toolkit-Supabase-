import React, { useState } from 'react'

const ApartmentInfo = ({ tableIndex, title, status, city, rooms, price, description, address, doubleBeds, singleBeds, distanceFromTheSea, facilities }) => {
  
  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      <span>{tableIndex}</span>
      <div>{title}</div>
      <div>{status}</div>
      <div>{city}</div>
      <div>{rooms}</div>
      <div>{price} e</div>
      <div>
        <button 
          onClick={toggleMoreDetailsSection} 
          className="p-2 bg-blue-50 border-[1px] border-black"
        >
          More Info
        </button>
      </div>

      { isOpenMoreDetailsSection && 
        <div className='col-span-full'>
          <div className='flex items-center justify-between'>
            <p>Description:</p>
            <p>{description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Address:</p>
            <p>{address}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Double beds:</p>
            <p>{doubleBeds}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Single beds:</p>
            <p>{singleBeds}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Distance from the sea:</p>
            <p>{distanceFromTheSea} km</p>
          </div>
          <div className='flex items-center justify-between'>
            <p>Facilities:</p>
            {facilities.map(facility => 
              <div key={facility.label} className='flex items-center justify-between gap-2'>
                <p>{facility.label}</p>
              </div>  
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default ApartmentInfo