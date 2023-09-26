import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import UpdatePostForm from './UpdatePostForm'
import { Store } from '@/types/store'
import { BiSolidRightArrowCircle } from 'react-icons/bi'

interface Props {
    store : Store
}

const UpdatePostSection = ({store}:Props) => {

  return (
    <div className='flex flex-col border-gray-300 p-4 border rounded-lg shadow-pointbox mt-20 w-[1200px]'>
      <div className='flex items-center text-md font-bold gap-1 border-b border-gray-300 py-2'>
      <div className='text-blue-400'>
          <BiSolidRightArrowCircle/>
        </div>
      <div>게시글 수정</div>
    </div>
    <UpdatePostForm store={store}/>
    </div>
  )
}

export default UpdatePostSection