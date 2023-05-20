import React from 'react'

const RouteContainer = (props) => {
  return (
    <div  className='px-6 py-12 flex flex-col gap-4'>
        {props.children}
    </div>
  )
}

export default RouteContainer