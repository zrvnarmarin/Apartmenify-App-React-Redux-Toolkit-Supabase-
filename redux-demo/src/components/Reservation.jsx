import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReservation } from './reservationsSlice'

const Reservation = ({ id, apartmentId, name, surname, startDate, endDate }) => {
  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  return (
    <div className='grid grid-cols-6 p-2 border-[1px] border-black'>
        <p>#{id}</p>
        <p>{apartmentId}</p>
        <p>{`${name} ${surname}`}</p>
        <p>{new Date(startDate).toLocaleDateString()}</p>
        <p>{new Date(endDate).toLocaleDateString()}</p>
        <button onClick={toggleMoreDetailsSection} className='p-2 border-[1px] border-black bg-blue-100'>More Info</button>
    </div>
  )
}

export default Reservation