import React from 'react'
import { useDispatch } from 'react-redux'
import ModalBackdrop from './ModalBackdrop'
import ModalContainer from './ModalContainer'
import ImageCarousel from '../Image Carousel/ImageCarousel'
import { closeModal } from '../modalSlice'
import XIcon from '../../assets/X.svg'

const ImageGalleryModal = ({ slides }) => {
  const dispatch = useDispatch()
  const closeModalWindow = () => dispatch(closeModal())

  return (
    <ModalBackdrop>
        <ModalContainer isAdmin={false}>
            <div className='flex flex-col gap-2'>
                <button 
                    className='w-full' 
                    onClick={closeModalWindow}
                >
                    <img 
                        src={XIcon} 
                        alt="clode_icon" 
                        className='hover:rotate-90 duration-500' 
                        width={30} 
                        height={30} 
                    />
                </button>
                
                <ImageCarousel 
                    slides={slides} 
                    showIndexedDots={false} 
                    showImageIndices={true} 
                />
            </div>
        </ModalContainer>
    </ModalBackdrop>
  )
}

export default ImageGalleryModal