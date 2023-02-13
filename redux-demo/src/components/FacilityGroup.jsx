import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllApartments, fetchApartments } from './apartmentsSlice';

const FacilityGroup = () => {
    const { facility } = useParams()
    console.log(facility)
  return (
    <div className='bg-red-400 text-4xl'>FacilityGroup {facility}</div>
  )
}

export default FacilityGroup