import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../auth/usersSlice'

const ManageAccount = () => {
  const user = useSelector(selectUser)
  const { user_metadata } = user
  console.log(user_metadata.avatar_url)

  const [isEditNameClicked, setIsEditNameClicked] = useState(false)
  const toggleIsEditNameClicked = () => setIsEditNameClicked(prev => !prev)

  const [isEditEmailClicked, setIsEditEmailClicked] = useState(false)
  const toggleIsEditEmailClicked = () => setIsEditEmailClicked(prev => !prev)

  return (
    <div>

      <div className='flex flex-wrap flex-row items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl'>Personal details</h1>
          <h2 className='text-md'>Update your info and find out how it's used.</h2>
        </div>
        <div className='hover:bg-blue-100 p-4'>
          <img className='rounded-full' src={user_metadata.avatar_url} />
        </div>
      </div>

      { isEditNameClicked 
      ? 
        <div>
          <label>First name</label>
          <input type="text" className='border-[1px] border-black p-2' />
          <label>Last name</label>
          <input type="text" className='border-[1px] border-black p-2' />
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditNameClicked}>
            Cancel
          </button>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditNameClicked}>
            Save
          </button>
        </div>
      :
        <div className='flex flex-row justify-between items-center'>
          <span>Name</span>
          <span>{user_metadata.name}</span>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditNameClicked}>
            Edit
          </button>
        </div>
      }

      { isEditEmailClicked
      ?
        <div>
          <label>Email Address</label>
          <input type="text" className='border-[1px] border-black p-2' />
          <p>We'll send a verification link to your new email address – check your inbox.</p>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditEmailClicked}>
            Cancel
          </button>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditEmailClicked}>
            Save
          </button>
        </div>
      :
        <div className='flex flex-row justify-between items-center'>
          <span>Email Address <span className='text-white font-medium bg-green-500 rounded-md p-1'>Veriffied</span></span>
          <span>{user_metadata.email}</span>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditEmailClicked}>
            Edit
          </button>
        </div>
      }

    </div>
  )
}

export default ManageAccount