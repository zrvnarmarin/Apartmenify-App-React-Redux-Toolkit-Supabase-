import React from 'react';
import { useSelector } from 'react-redux';
import { desiredStayNightsNumber } from '../../../admin/reservations/reservationsSlice';

const ReserveApartmentSummary = ({ apartmentPrice }) => {
  const numberOfDesiredStayNights = useSelector(desiredStayNightsNumber);
  const totalPriceWithAllNights = apartmentPrice * numberOfDesiredStayNights;

  if (totalPriceWithAllNights === 0) return 

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-1 justify-between'>
        <p className='underline'>€ {apartmentPrice} x {numberOfDesiredStayNights} nights</p>
        <p>€ {totalPriceWithAllNights}</p>
      </div>
      <div className='flex flex-row gap-1 justify-between'>
        <p className='underline'>Apartmenify fee</p>
        <p>€ [78]</p>
      </div>
      <div className='flex flex-row gap-1 justify-between pb-3'>
        <p className='underline'>Cleaning fee</p>
        <p>€ [78]</p>
      </div>
      <hr />
      <div className='flex flex-row gap-1 justify-between font-semibold text-xl'>
        <p>Total</p>
        <p>€ [1299]</p>
      </div>
    </div>
  );
};

export default ReserveApartmentSummary;
