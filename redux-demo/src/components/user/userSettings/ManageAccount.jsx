import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../auth/usersSlice'
import { countries } from '../../../data/countries'
import { genders } from '../../../data/genders'

const ManageAccount = () => {
  const user = useSelector(selectUser)
  const { user_metadata } = user
  // console.log(user_metadata)

  const [isEditNameClicked, setIsEditNameClicked] = useState(false)
  const toggleIsEditNameClicked = () => setIsEditNameClicked(prev => !prev)

  const [isEditEmailClicked, setIsEditEmailClicked] = useState(false)
  const toggleIsEditEmailClicked = () => setIsEditEmailClicked(prev => !prev)

  const [isEditDateOfBirthClicked, setIsEditDateOfBirthClicked] = useState(false)
  const toggleIsEditDateOfBirthClicked = () => setIsEditDateOfBirthClicked(prev => !prev)

  const [isEditNationalityClicked, setIsEditNationalityClicked] = useState(false)
  const toggleIsEditationalityClicked = () => setIsEditNationalityClicked(prev => !prev)

  const [isEditGenderClicked, setIsEditGenderClicked] = useState(false)
  const toggleIsEditGenderClicked = () => setIsEditGenderClicked(prev => !prev)

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
          <span>John</span>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditNameClicked}>
            Edit
          </button>
        </div>
      }

      <hr className='my-2' />

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
          <span>testemail@email.com</span>
          <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditEmailClicked}>
            Edit
          </button>
        </div>
      }

    <hr className='my-2' />

    { isEditDateOfBirthClicked
    ?
      <div>
        <label>Date Of Birth</label>
        <input type="text" className='border-[1px] border-black p-2' />
        <p>Enter your date of birth.</p>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditDateOfBirthClicked}>
          Cancel
        </button>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditDateOfBirthClicked}>
          Save
        </button>
      </div>
    :
      <div className='flex flex-row justify-between items-center'>
        <span>Date Of Birth</span>
        <span>Neki datum</span>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditDateOfBirthClicked}>
          Edit
        </button>
      </div>
    }

    <hr className='my-2' />

    { isEditNationalityClicked
    ?
      <div>
        <label>Nationality</label>
        <select>
          {countries.map(country =>
            <option key={country}>{country}</option>  
          )}
        </select>
        <p>Select the country/region you`re from.</p>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditationalityClicked}>
          Cancel
        </button>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditationalityClicked}>
          Save
        </button>
      </div>
    :
      <div className='flex flex-row justify-between items-center'>
        <span>Nationality</span>
        <span>Select the country/region you`re from.</span>
        <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditationalityClicked}>
          Edit
        </button>
      </div>
    }

    <hr className='my-2' />

    { isEditGenderClicked
        ?
          <div>
            <label>Gender</label>
            <p>Select your gender.</p>
            <select>
              {genders.map(gender =>
                <option key={gender}>{gender}</option>  
              )}
            </select>
            <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditGenderClicked}>
              Cancel
            </button>
            <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditGenderClicked}>
              Save
            </button>
          </div>
        :
          <div className='flex flex-row justify-between items-center'>
            <span>Gender</span>
            <span>Select your gender.</span>
            <button className='bg-blue-100 border-black border-[1px] p-2' onClick={toggleIsEditGenderClicked}>
              Edit
            </button>
          </div>
        }


        </div>
      )
    }

export default ManageAccount