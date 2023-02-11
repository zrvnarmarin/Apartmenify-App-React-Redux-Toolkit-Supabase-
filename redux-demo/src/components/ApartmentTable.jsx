import React from 'react'
import FilterSortSection from './FilterSortSection.jsx'
import ApartmentTableHeader from './ApartmentTableHeader.jsx'
import ApartmentInfo from './ApartmentInfo.jsx'

const ApartmentTable = () => {
  return (
    <div style={{ padding: '5px', border: '1px solid red', display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1>Apartments</h1>
      <FilterSortSection />
      <div style={{ border: '1px solid brown', padding: '5px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <ApartmentTableHeader />
        <ApartmentInfo />
      </div>
    </div>
  )
}

export default ApartmentTable