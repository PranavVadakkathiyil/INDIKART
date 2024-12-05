import React from 'react'

const Title = ({title1,title2}) => {
  return (
    <div className='inline-flex items-center'>
        <p className='text-gray-600'>{title1}<span className='text-gray-700 ml-3'>{title2}</span></p>
        <p className='w-8 bg-black'></p>
    </div>
  )
}

export default Title