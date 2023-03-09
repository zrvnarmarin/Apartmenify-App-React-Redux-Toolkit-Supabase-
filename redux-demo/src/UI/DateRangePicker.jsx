import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { setStartDate, setEndDate } from "../components/reservationsSlice";

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  console.log(startDate, endDate)

  return (
    <DatePicker
      className="border-[1px] border-black p-2"
      placeholderText="Date"
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={update => setDateRange(update)}
      isClearable={true}
    />
  );
};

export default DateRangePicker;