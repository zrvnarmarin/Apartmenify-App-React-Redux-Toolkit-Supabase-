import React from 'react'

const AddNewApartment = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid brown', display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <h1>AddNewApartment</h1>
        <div className='grid grid-cols-2 gap-4'>
            <input type="text" className='border-[1px] border-black p-1' placeholder='Title' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='City' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Price' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Distance From The Sea' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Description' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Address' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='rooms' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Single Beds' />
            <input type="text" className='border-[1px] border-black p-1' placeholder='Double Beds' />
        </div>
    </div>
  )
}

export default AddNewApartment