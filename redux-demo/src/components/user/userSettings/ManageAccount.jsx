import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../auth/usersSlice'

const ManageAccount = () => {
  const user = useSelector(selectUser)
  const { user_metadata } = user
  // console.log(user_metadata.avatar_url)
  const [isEditNameClicked, setIsEditNameClicked] = useState(false)
  const toggleIsEditNameClicked = () => setIsEditNameClicked(prev => !prev)

  return (
    <div>
      <div>
        <h1 className='text-2xl'>Personal details</h1>
        <h2 className='text-md'>Update your info and find out how it's used.</h2>
        <p>{JSON.stringify(user_metadata)}</p>
        <div>
          <img src={''} />
        </div>
      </div>

      { isEditNameClicked 
      ? 
        <div>
          <label>First name</label>
          <input type="text" className='border-[1px] border-black p-2' />
          <label>Last name</label>
          <input type="text" className='border-[1px] border-black p-2' />
          <button className='bg-blue-100 border-black border-[1px]' onClick={toggleIsEditNameClicked}>
            Cancel
          </button>
          <button className='bg-blue-100 border-black border-[1px]' onClick={toggleIsEditNameClicked}>
            Save
          </button>
        </div>
      :
        <div className='flex flex-row justify-between items-center'>
          <span>Name</span>
          <span>{user_metadata.name}</span>
          <button className='bg-blue-100 border-black border-[1px]' onClick={toggleIsEditNameClicked}>
            Edit
          </button>
        </div>
      }

    </div>
  )
}

export default ManageAccount