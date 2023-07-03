import React from 'react'

const FacilityFilters = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-0 ss:gap-4 py-4 sm:py-0'>
        {facilityObjects.map((facility, i) => 
          <span 
            key={facility.value} 
            className={`${isActive === i + 1 ? 'bg-green-300' : 'bg-[#4E9DEF]'} 
                rounded-md font-medium text-[#f5eced]`
            }
          >
            <Link 
              to={`/adminDashboard/facilities`} 
              onClick={() => {
                setIsActive(i + 1)
                existingFacilityClickHandler(facility.value)
              }}
              className='flex items-center gap-4 p-2 w-full'
            >
              <img 
                src={facility.iconSrc} 
                alt="facility_icon" 
                className='bg-white p-1 rounded-full inline-block' 
                width={40}
                height={40}

              />
              <span>{facility.value}</span>
              <span className='rounded-full ml-2 px-3 py-1 bg-[#1f1f1f]'>{facility.occurences}</span>
            </Link>
          </span>
        )}
    </div>
  )
}

export default FacilityFilters