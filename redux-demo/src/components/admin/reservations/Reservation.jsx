import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsModalOpen, openModal } from '../../../UI/modalSlice'
import { modalTexts } from '../../../data/modal/modalTexts'
import { deleteReservation } from './reservationsSlice'
import Modal from '../../../UI/Modal'
import { toast } from 'react-toastify';
import DeleteIcon from '../../../assets/action_icons/delete_icon.png'
import UpdateIcon from '../../../assets/action_icons/update_icon.png'

const Reservation = ({ index, id, name, surname, startDate, endDate, apartmentTitle, apartmentId, userId, userEmail, status }) => {

  const dispatch = useDispatch()

  const deleteSelectedReservation = () => {
    dispatch(deleteReservation(id))
    toast.success(`Reservation # ${id} is deleted permanently!`)
  }

  const isModalOpen = useSelector(selectIsModalOpen)
  const openModalWindow = () => dispatch(openModal())

  return (
    <div>
      <div className='grid grid-cols-8 items-center md:gap-0 p-2 bg-[#182028] text-[#f5f0f1] text-md font-normal'>
      <p>{index}</p>
      <p>#{id}</p>
      <p>{status}</p>
      <p>{apartmentTitle}</p>
      <p>{`${name} ${surname}`}</p>
      <p>{new Date(startDate).toLocaleDateString()}</p>
      <p>{new Date(endDate).toLocaleDateString()}</p>
      <div className='flex flex-row gap-2'>
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
      </div>

      { 
        isModalOpen && 
        <Modal 
          modalText={modalTexts.deleteReservation} 
          confirmAction={deleteSelectedReservation} 
        />
      }
    </div>
    <hr className='border-slate-800' />

    </div>
  )
}

export default Reservation