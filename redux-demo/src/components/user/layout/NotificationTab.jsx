import React from 'react'

const NotificationTab = () => {
  return (
    <div className='absolute z-10 drop-shadow-2xl rounded w-96 h-32 flex flex-row p-10 top-10 right-2 gap-2 bg-white'>
        {[1,2].map(n => 
            <div key={n} className='bg-red-400 border-2 border-black p-4'>{n}</div>    
        )}
        
    </div>
  )
}

export default NotificationTab