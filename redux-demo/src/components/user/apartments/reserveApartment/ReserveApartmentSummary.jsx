import React from 'react';
import { useSelector } from 'react-redux';
import { desiredStayNightsNumber } from '../../../admin/reservations/reservationsSlice';
import { APARTMENIFY_PERCENTAGE_FEE } from '../../../../constants';

const ReserveApartmentSummary = ({ apartmentPrice }) => {
  const numberOfDesiredStayNights = useSelector(desiredStayNightsNumber);
  const totalPriceWithAllNights = apartmentPrice * numberOfDesiredStayNights;
  const apartmenifyFee = totalPriceWithAllNights * APARTMENIFY_PERCENTAGE_FEE
  const totalReservationSum = totalPriceWithAllNights + apartmenifyFee

  if (totalPriceWithAllNights === 0) return 

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-1 justify-between'>
        <p className='underline'>€ {apartmentPrice} x {numberOfDesiredStayNights} nights</p>
        <p>€ {totalPriceWithAllNights}</p>
      </div>
      <div className='flex flex-row gap-1 justify-between'>
        <p className='underline'>Apartmenify fee</p>
        <p>€ {apartmenifyFee}</p>
      </div>
      <hr />
      <div className='flex flex-row gap-1 justify-between font-semibold text-xl'>
        <p>Total</p>
        <p>€ {totalReservationSum}</p>
      </div>
    </div>
  );
};

export default ReserveApartmentSummary;
