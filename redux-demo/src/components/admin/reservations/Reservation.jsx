import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { selectIsModalOpen, openModal } from '../../../UI/modalSlice'
import { modalTexts } from '../../../data/modal/modalTexts'
import { deleteReservation } from './reservationsSlice'
import Modal from '../../../UI/Modal'
import DeleteIcon from '../../../assets/action_icons/delete_icon.png'
import UpdateIcon from '../../../assets/action_icons/update_icon.png'

const Reservation = ({ index, id, name, surname, startDate, endDate, apartmentTitle, apartmentId, userId, userEmail, status }) => {

  const dispatch = useDispatch()

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  let user = `${name} ${surname}`

  const deleteSelectedReservation = () => {
    dispatch(deleteReservation(id))
    toast.success(`Reservation # ${id} is deleted permanently!`)
  }

  return (
    <div>
      <div className='grid grid-cols-7 items-center md:gap-0 p-2 bg-[#182028] text-[#f5eced] text-xl font-semibold'>

        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>#</span>
          <p className='col-span-full md:col-span-1'>{index}</p>
        </div>
        
        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Id</span>
          <p className='col-span-full md:col-span-1'>{id}</p>
        </div>

        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Apartment Title</span>
          <p className='col-span-full md:col-span-1'>{apartmentTitle}</p>
        </div>

        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Reserved By</span>
          <p className='col-span-full md:col-span-1'>{user}</p>
        </div>

        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>Start Date</span>
          <p className='col-span-full md:col-span-1'>{new Date(startDate).toLocaleDateString()}</p>
        </div>

        <div className='col-span-full md:col-span-1'>
          <span className='md:hidden text-[#f5eced] text-2xl font-semibold'>End Date</span>
          <p className='col-span-full md:col-span-1'>{new Date(endDate).toLocaleDateString()}</p>
        </div>

        <div className='flex flex-row gap-2'>
          { status === 'confirmed' || status === 'inProgress'
            ? 
              <button className="p-2 bg-[#38C786] rounded-full">
                <Link 
                  to={`${id}`} 
                  state={{ index: index, id: id, userId: userId, userEmail: userEmail, name: name, surname: surname, startDate: startDate, endDate: endDate, apartmentId: apartmentId, apartmentTitle: apartmentTitle, status: status }}
                >
                  <img 
                    src={UpdateIcon} 
                    width={20}
                    height={20} 
                    alt="delete_icon_button" 
                  />
                </Link>
              </button>
            : 
              <></>
          }
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
        </div>
      </div>
    
      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteReservation} 
          confirmAction={deleteSelectedReservation} 
        />
      }
      <hr className='border-slate-800' />
    </div>
  )
}

export default Reservation