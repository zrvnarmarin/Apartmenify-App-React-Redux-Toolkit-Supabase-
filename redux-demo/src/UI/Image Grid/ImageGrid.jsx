import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../modalSlice'
import DotsGridIcon from '../../assets/dots_grid_icon.png'

const ImageGrid = ({ slides }) => {
  const dispatch = useDispatch()

  const openImageGalleryModal = () => dispatch(openModal('image gallery'))

  return (
    <div className='relative grid grid-cols-4 grid-rows-2 gap-2 rounded'>
        {slides.map((slide, slideIndex) =>
          <div 
            key={slide.title} 
            className={`${slide.main === true ? 'col-span-2 row-span-full' : 'col-span-1 row-span-1'} `}
          >
            <img 
              src={slide.url} 
              alt='apartment_image' 
              className={`${slide.main === true ? 'rounded-tl-md rounded-bl-md' : 'border-tl-none'} opacity-100 hover:opacity-80 duration-300 w-full object-cover h-full hover:cursor-pointer`}
              onClick={openImageGalleryModal}
            />
          </div>
        )}
        <button 
          onClick={openImageGalleryModal}
          className='absolute flex flex-row items-center gap-2 bottom-4 right-4 border-[1px] border-slate-800 bg-white hover:bg-slate-100 text-slate-800 rounded-lg px-4 py-2 text-sm font-normal shadow-2xl'
        >
          <img 
            src={DotsGridIcon} 
            alt="dots_grid_icon" 
            width={25} 
            height={25} 
          />
          Show All Photos
        </button>
      </div>
  )
}

export default ImageGrid