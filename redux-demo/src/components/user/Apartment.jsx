import React from 'react'
import { Link } from 'react-router-dom'

const Apartment = ({ id: apartmentId, title, description, city, rooms, price }) => {

    return (
        <li className='flex gap-4 border-[1px] border-black items-center'>
            <img
                src="https://exej2saedb8.exactdn.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-04-at-2.28.40-PM.png?strip=all&lossy=1&ssl=1"
                className='w-32 h-32 border-[1px] border-black '
            />
            <div>
                <p>TITLE: {title}</p>
                <p>DESCRIPTION: {description}</p>
                <p>CITY: {city}</p>
                <p>ROOMS: {rooms} rooms</p>
            </div>
            <div className='flex flex-col gap-2 justify-start'>
                <p>8.9</p>
                <p>Exceptional</p>
                <p>PRICE: {price} e</p>
                
            </div>
            <div className='flex flex-row gap-2'>
                <button>
                    <Link
                        to={`/userDashboard/apartments/${apartmentId}`}
                        state={{ apartmentId: apartmentId, apartmentTitle: title }}
                        className='p-2 border-[1px] border-black bg-blue-100'
                    >
                        Reserve
                    </Link>
                </button>
            </div>

        </li>
    )
}

export default Apartment
