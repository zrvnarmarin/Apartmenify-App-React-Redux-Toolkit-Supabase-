import React, { useState } from 'react'

const Reservation = ({ index, id, apartmentId, name, surname, startDate, endDate }) => {
  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      <p>{index}</p>
      <p>#{id}</p>
      <p>#{apartmentId}</p>
      <p>{`${name} ${surname}`}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <button onClick={toggleMoreDetailsSection} className='p-2 border-[1px] border-black bg-blue-100'>Manage</button>
    </div>
  )
}

export default Reservation