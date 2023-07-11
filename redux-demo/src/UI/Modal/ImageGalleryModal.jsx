import React from 'react'
import ModalBackdrop from './ModalBackdrop'
import ModalContainer from './ModalContainer'
import { useDispatch } from 'react-redux'
import { closeModal } from '../modalSlice'

const ImageGalleryModal = ({ slides }) => {
    const dispatch = useDispatch()

    const closeModalWindow = () => dispatch(closeModal())
  return (
    <ModalBackdrop>
        <ModalContainer>
            <div>Gallery</div>
            <button onClick={closeModalWindow}>Close</button>
        </ModalContainer>
    </ModalBackdrop>
  )
}

export default ImageGalleryModal