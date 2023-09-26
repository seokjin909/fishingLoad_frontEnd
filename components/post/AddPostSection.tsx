import React from 'react'
import AddPostForm from './AddPostForm'
import {BiSolidRightArrowCircle} from "react-icons/bi"

const AddPostSection = () => {

  return (
    <div className='flex flex-col border-gray-300 p-4 border rounded-lg shadow-pointbox mt-20 w-[1200px]'>
      <div className='flex items-center text-md font-bold gap-1 border-b border-gray-300 py-2'>
      <div className='text-blue-400'>
          <BiSolidRightArrowCircle/>
        </div>
      <div>게시글 작성하기</div>
    </div>
    <AddPostForm />
    </div>
  )
}

export default AddPostSection