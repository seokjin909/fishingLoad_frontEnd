import { Store } from '@/types/store'
import React from 'react'
import Comment from './Comment';
import AddComment from './AddComment';
interface Props {
    comment : Store['commentList']
}

export const CommentSection = ({comment}:Props) => {
  
  return (
    <div className='w-full border-t-2 border-gray-300 mb-4'>
      {!comment && <div className='py-4 font-thin'>댓글이 없습니다.</div> }
      {comment && (
        <div className='py-2'>
          <div className='font-bold flex items-center'>
          전체 댓글 &nbsp;<p className='text-red-400'>{comment?.length}</p>&nbsp;개
          </div>
          <div>
            {comment?.map((data)=> {
              return <Comment key={data.id} data={data} />
            })}
          </div>
        </div>)}
      <AddComment />
    </div>
  )
}
