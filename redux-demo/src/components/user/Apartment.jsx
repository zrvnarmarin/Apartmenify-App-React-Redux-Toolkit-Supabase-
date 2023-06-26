import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StarPlaceholder from '../../assets/starPlaceholder.png'

const Apartment = ({ id: apartmentId, title, city, price, singleBeds, doubleBeds, isApartmentLiked }) => {
    const test = () => {
        console.log(isApartmentLiked(apartmentId))
    }

    return (
        <li className='flex flex-col items-start sm:grid grid-cols-[repeat(auto-fit,minmax(200px ,1fr))] sm:grid-cols-3 gap-4 border-[1px] border-black'>
            <div className='w-full h-full'>
                <img
                    src="https://exej2saedb8.exactdn.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-04-at-2.28.40-PM.png?strip=all&lossy=1&ssl=1"
                    className='flex-1 w-full h-full object-cover'
                />
            </div>

            <div className='flex flex-col gap-2 bg-slate-100 w-full h-full text-xl font-normal text-gray-900 capitalize'>
                <p>{title}</p>
                <div>
                    {[1, 2, 3, 4, 5].map(number => 
                        <img key={number} src={StarPlaceholder} width={30} height={30} alt="rating_star" className='inline-block' />
                    )}
                </div>
                <a href="" className='underline underline-offset-2 underline-blue-400'>{city}</a>
                <p>{singleBeds} single beds, {doubleBeds} double beds</p>
                <p className='text-green-700 uppercase'>Free <span className='lowercase'>Cancelation</span></p>
                <p>NO prepayment needed – pay at the property</p>
            </div>

            <div className='bg-slate-100 p-2 flex flex-col xs:flex-row xs:gap-16 sm:gap-2 justify-between items-start sm:flex-col h-full w-full text-xl font-normal text-gray-900 capitalize'>
                <div>
                    <div className='flex flex-row gap-2'>
                        <p className='self-center text-4xl rounded-xl bg-red-200 p-2'>8.9</p>
                        <div className='self-center '>
                            <p className='text-2xl'>Exceptional</p>
                            <p className='text-lg'>1,565 reviews</p>
                        </div>
                    </div>
                    <p>PRICE: {price} e</p>
                    <p>Includes taxes and charges</p>
                </div>
                
                <button className='w-full flex flex-row gap-2'>
                    <Link
                        to={`/userDashboard/apartments/${apartmentId}`}
                        state={{ apartmentId: apartmentId, apartmentTitle: title }}
                        className='p-2 border-[1px] border-black bg-blue-100 w-full'
                    >
                        See Availability
                    </Link>
                </button>
            </div>
            #{apartmentId}
            <button onClick={() => {
                test()
            }}>Display liked status</button>

        </li>
    )
}

export default Apartment
