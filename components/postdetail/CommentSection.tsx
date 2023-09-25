import { Comment, Store } from '@/types/store'
import React, { useEffect, useState } from 'react'
import AddComment from './AddComment';
import CommentComp from './CommentComp';
interface Props {
    comment : Comment[];
    store: Store;
    userId : string;
}

export const CommentSection = ({comment,store,userId}:Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(()=>{
    setComments(comment.sort((a,b)=>{
      const dateA = a.id;
      const dateB = b.id;
      return dateA - dateB;
    }));
  },[comment])
  
  return (
    <div className='w-full border-t-2 border-gray-300 mb-4'>
      {!comments && <div className='py-4 font-thin'>댓글이 없습니다.</div> }
      {comments && (
        <div className='py-2'>
          <div className='font-bold flex items-center'>
          전체 댓글 &nbsp;<p className='text-red-400'>{comments?.length}</p>&nbsp;개
          </div>
          <div>
            {comments?.map((data)=> {
              return <CommentComp key={data.id} data={data} userId={userId} setComments={setComments} comments={comments} store={store}/>
            })}
          </div>
        </div>)}
      <AddComment store={store} setComments={setComments} comments={comments}/>
    </div>
  )
}
