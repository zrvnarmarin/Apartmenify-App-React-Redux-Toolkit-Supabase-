import React, { useState } from 'react'

const Saved = () => {
  const [isSavedApartmentsListShown, setIsSavedApartmentsListShown] = useState(false)
  const toggleSavedApartmentsList = () => setIsSavedApartmentsListShown(prev => !prev)

  const [isCreateNewListShown, setIsCreateNewListShown] = useState(false)
  const toggleNewList = () => setIsCreateNewListShown(prev => !prev)

  return (
    <div>
      <div className='flex flex-row gap-2 items-center'>

        <h1 className='text-2xl'>Saved</h1>

        <button onClick={toggleSavedApartmentsList} className='p-2 border-[1px] border-black bg-blue-100'>
          England -- 
        </button>

        <div>
          { 
            isSavedApartmentsListShown && 
            <div className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px]
            border-black absolute top-[25%] left-20 bg-white '
            >
              <p className='flex row items-center gap-2'>
                <span>Marin</span>
                <span className='rounded-full px-[6px] py-[1px] bg-slate-700 text-white'>0</span>
                <span className='p-2 bg-blue-100'>Update</span>
                <span className='p-2 bg-blue-100'>Delete</span>
              </p>
              <p className='flex row items-center gap-2'>
                <span>Marin</span>
                <span className='rounded-full px-[6px] py-[1px] bg-slate-700 text-white'>0</span>
                <span className='p-2 bg-blue-100'>Update</span>
                <span className='p-2 bg-blue-100'>Delete</span>
              </p>
              <p className='flex row items-center gap-2'>
                <span>Marin</span>
                <span className='rounded-full px-[6px] py-[1px] bg-slate-700 text-white'>0</span>
                <span className='p-2 bg-blue-100'>Update</span>
                <span className='p-2 bg-blue-100'>Delete</span>
              </p>
            </div>
          }
        </div>

        <button onClick={toggleNewList} className='p-2 border-[1px] border-black bg-blue-100'>Create A List</button>

        <div>
          { 
            isCreateNewListShown && 
            <div className='flex flex-col gap-2 text-black p-4 rounded-lg border-[1px]
            border-black absolute top-[25%] left-[21%] bg-white '
            >
              <div className='flex flex-row items-center justify-between '>
                <span>Create A New List</span>
                <button onClick={toggleNewList} className='pr-1'>X</button>
              </div>
              <input 
                type="text" 
                placeholder='Name your new list' 
                className='p-2 border-black border-[1px]'
              />
              <button className='p-2 border-black border-[1px] bg-blue-100'>Create</button>
            </div>
          }
        </div>

      </div>
    </div>
  )
}

export default Saved