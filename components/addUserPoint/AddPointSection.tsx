import React from 'react'
import AddPointForm from './AddPointForm'
import {BiSolidRightArrowCircle} from "react-icons/bi"
const AddPointSection = () => {

  return (
    <div className='flex flex-col border-gray-300 p-4 border rounded-lg shadow-pointbox mt-20 w-[1200px]'>
      <div className='flex items-center text-md font-bold gap-1 border-b border-gray-300 py-2'>
        <div className='text-blue-400'>
          <BiSolidRightArrowCircle/>
        </div>
        신규 포인트 등록하기
      </div>
      <AddPointForm />
    </div>
  )
}

export default AddPointSection
