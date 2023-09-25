import React from 'react'
import AddPointForm from './AddPointForm'

const AddPointSection = () => {

  return (
    <div className='flex flex-col'>
    <div className='text-2xl font-bold'>나만의 포인트 등록</div>
    <AddPointForm />
    </div>
  )
}

export default AddPointSection