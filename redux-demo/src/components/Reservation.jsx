import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Reservation = ({ index, id, name, surname, startDate, endDate, apartmentTitle, userId, userEmail }) => {
  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  return (
    <div className='grid grid-cols-7 p-2 border-[1px] border-black'>
      <p>{index}</p>
      <p>#{id}</p>
      <p>{apartmentTitle}</p>
      <p>{`${name} ${surname}`}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <button 
        onClick={toggleMoreDetailsSection} 
        className='p-2 border-[1px] border-black bg-blue-100'
      >
        { isOpenMoreDetailsSection ? 'Close' : 'Manage'}
      </button>

      { isOpenMoreDetailsSection && 
        <div>
          <button className='p-2 border-[1px] border-black bg-blue-100'>Delete</button>
          <button className='p-2 border-[1px] border-black bg-blue-100'>
          <Link 
            to={`${id}`} 
            state={{ index: index, id: id, userId: userId, userEmail: userEmail, name: name, surname: surname, startDate: startDate, endDate: endDate, apartmentTitle: apartmentTitle}}
          >
          Update
        </Link>
          </button>
        </div>
      }

    </div>
  )
}

export default Reservation