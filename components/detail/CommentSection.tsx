import { Store } from '@/types/store'
import React from 'react'
import Comment from './Comment';
interface Props {
    comment : Store['commentList']
}

export const CommentSection = ({comment}:Props) => {
  return (
    <div>
        <div>
        댓글 영역
        </div>
        <div>
            {comment?.map((data)=> {
                return <Comment key={data.id} data={data} />
            })}
        </div>
    </div>
  )
}
