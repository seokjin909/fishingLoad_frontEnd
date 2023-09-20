import React from 'react'
import { Comment } from '@/types/store';

interface Props {
    data : Comment;
}
const Comment = ({data}:Props) => {
  return (
    <div>
    <div className='flex gap-2'>
        <div>{data.accountId}</div>
        <div>{data.comment}</div>
        {/* 비작성자가 보이는 화면 */}
        <button>좋아요</button>
        {/* 작성자만 보이는 버튼 */}
        <button>수정</button>
        <button>삭제</button>
    </div>
    <div className='flex gap-2'>
    {/* 좋아요 이벤트 처리 해야함! */}
    <div>좋아요 수 : {data.commentLike}</div>
    {/* input 태그로 변경해야 함! */}
    </div>
    </div>
  )
}

export default Comment