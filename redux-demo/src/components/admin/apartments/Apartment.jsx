import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteApartment } from './apartmentsSlice'
import { openModal, selectIsModalOpen, selectModalType } from '../../../UI/modalSlice'
import { modalTexts } from '../../../data/modal/modalTexts'
import ArrowImage from '../../../assets/ArrowDown.webp'
import { getAllWishlists } from './../../auth/usersSlice';
import DeleteIcon from '../../../assets/action_icons/delete_icon.png'
import UpdateIcon from '../../../assets/action_icons/update_icon.png'
import ConfirmModal from '../../../UI/Modal/ConfirmModal.jsx';

const Apartment = ({ id, tableIndex, title, city, rooms, price, description, address, doubleBeds, singleBeds, distanceFromTheSea, facilities, availability }) => {
  
  const dispatch = useDispatch()

  const deleteSelectedApartment = () => {
    dispatch(deleteApartment(id))
    toast.success(`Apartment with ID ${id} deleted!`)
    // dispatch(getAllWishlists())
    console.log(id)
  }

  const [isOpenMoreDetailsSection, setIsOpenMoreDetailsSection] = useState(false)
  const toggleMoreDetailsSection = () => setIsOpenMoreDetailsSection(prev => !prev)

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal('confirm'))
  const modalType = useSelector(selectModalType)

  return (
    <div>
      <div className='grid grid-cols-7 items-center md:gap-0 p-2 bg-[#182028] text-[#f5f0f1] text-md font-normal'>

        <div className=' text-[#f5eced] text-xl font-semibold col-span-full md:col-span-1'>
          <span className='inline-block md:hidden'>#</span>
          <span>{tableIndex}  {id}</span>
        </div>

        <div className=' col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Title</span>
            <span className='text-lg font-semibold'>{title}</span>
          </div>
        </div>
        
        <div className=' flex col-span-full items-start md:col-span-1 relative justify-start md:justify-start'>
          <div className='flex flex-col items-start md:items-start justify-self-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Availability</span>
            <div className='flex items-center gap-2'>
            <div
              className={
                `${
                  availability === 'free'
                  ? 'bg-[#1E3E39] text-[#31C786]'
                  : availability === 'reserved'
                  ? 'bg-[#403C2D] text-[#F4BA38]'
                  : 'bg-[#3F2B2E] text-[#E25E49]'
                } rounded-md px-1 shadow-md`
              }
            >
              <span className='text-xs font-semibold'>{ availability === 'free' ? 'Free' : availability === 'reserved' ? 'Reserved' : 'Occupied' }</span>
            </div>
                   
              <span className='capitalize md:hidden text-lg font-semibold'>{availability}</span>
            </div>
          </div>
        </div>
        
        <div className=' col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>City</span>
            <span className='text-lg font-semibold'>{city}</span>
          </div>
        </div>
        
        {/* Number of rooms section */}
        <div className=' col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Rooms</span>
            <span className='text-lg font-semibold'>{rooms}</span>
          </div>
        </div>

        {/* Price section */}
        <div className=' col-span-full md:col-span-1'>
          <div className='flex flex-col items-start md:items-start gap-2 text-center md:text-start'>
            <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Price</span>
            <span className='text-lg font-semibold'>{price}e</span>
          </div>
        </div>

        {/* Action buttons section */}
        <div className='col-span-full md:col-span-1 flex gap-4 items-center justify-start'>
            <button className="p-2 bg-[#38C786] rounded-full">
              <Link 
                to={`${id}`} 
                state={{
                  id: id,
                  title: title,
                  city: city,
                  rooms: rooms,
                  price: price,
                  description: description,
                  address: address,
                  singleBeds: singleBeds,
                  doubleBeds: doubleBeds,
                  distanceFromTheSea,
                  facilities: facilities, 
                  availability: availability
                }}
              >
                <img 
                  src={UpdateIcon} 
                  width={20}
                  height={20} 
                  alt="delete_icon_button" 
                />
              </Link>
            </button>
            <button
              onClick={openModalWindow}
              className="p-2 bg-[#ED5E49] rounded-full"
            >
              <img 
                src={DeleteIcon} 
                width={20}
                height={20} 
                alt="delete_icon_button" 
              />
            </button>
          <button
            onClick={toggleMoreDetailsSection}
            className="p-2 bg-[#0E1217] rounded-full"
          >
            <img
              src={ArrowImage} 
              width={20}
              height={20}
              className={`${!isOpenMoreDetailsSection ? "rotate-180" : ""} duration-300`} 
            />
          </button>
        </div>

        {/* More about section */}
        { isOpenMoreDetailsSection &&
          <div className='col-span-full mt-8 bg-[#0E1217] p-2 border-[1px] border-slate-500'>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Description:</p>
              <p>{description}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Address:</p>
              <p>{address}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Double beds:</p>
              <p>{doubleBeds}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Single beds:</p>
              <p>{singleBeds}</p>
            </div>
            <div className='flex items-center justify-between p-2'>
              <p className='text-[#f5eced] text-lg font-semibold'>Distance from the sea:</p>
              <p>{distanceFromTheSea} km</p>
            </div>
            <div className='flex items-center justify-between pb-4'>
              <p className='text-[#f5eced] text-lg font-semibold '>Facilities:</p>
              <div className="flex flex-row flex-wrap gap-2 md:gap-8 p-4 md:p-0">
                {facilities.map((facility, i) =>
                  <div key={i} className='flex items-center justify-between gap-2'>
                    <p className="bg-[#F4BA40] p-2 rounded-md font-medium">
                      {facility}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div>

      { 
        isModalOpen && modalType === 'confirm' && 
        <ConfirmModal 
          modalText={modalTexts.deleteApartment} 
          confirmAction={deleteSelectedApartment} 
          isAdmin={true}
        />
      }
      <hr className='border-slate-800' />
    </div>
  )
}

export default Apartment