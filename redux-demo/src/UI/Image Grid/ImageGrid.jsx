import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../modalSlice'

const ImageGrid = ({ slides }) => {
  const dispatch = useDispatch()

  const openImageGalleryModal = () => dispatch(openModal('image gallery'))

  return (
    <div className='grid grid-cols-4 grid-rows-2 gap-2 rounded bg-red-200 relative'>
        {slides.map((slide, slideIndex) =>
          <div 
            key={slide.title} 
            className={`${slide.main === true ? 'col-span-2 row-span-full' : 'col-span-1 row-span-1'} `}
          >
            <img 
              src={slide.url} 
              alt='apartment_image' 
              className={`${slide.main === true ? 'rounded-tl-md rounded-bl-md' : 'border-tl-none'} w-full object-cover h-full hover:cursor-pointer`}
              onClick={openImageGalleryModal}
            />
          </div>
        )}
        <button 
        onClick={() => {
          openImageGalleryModal()
        }}
          className='absolute bottom-4 right-4 border-[1px] border-slate-800 bg-white text-slate-800 rounded-lg px-4 py-2 text-sm font-normal shadow-2xl'
        >
          Show All Images
        </button>
      </div>
  )
}

export default ImageGrid