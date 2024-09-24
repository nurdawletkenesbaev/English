import React from 'react'

const Content = ({children}) => {
  return (
    <div className='w-full h-[calc(100vh-71px)] overflow-y-auto'>
      {children}
    </div>
  )
}

export default Content
