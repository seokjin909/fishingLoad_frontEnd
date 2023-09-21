import React from 'react'
import { AiFillHeart, AiFillDelete, AiOutlineHeart} from "react-icons/ai"
import { BiSolidPencil} from "react-icons/bi"
import { BsArrowReturnRight } from "react-icons/bs"
import { Comment } from '@/types/store';
import MyModal from '../common/MyModal';
import { deleteComment } from '@/pages/api/deleteComment';

interface Props {
    data : Comment;
    userId : string;
}
const CommentComp = ({data,userId}:Props) => {
  // 댓글 수정 함수

  // 댓글 삭제 함수
  const DeleteComment = async() => {
    try {
      const response = await deleteComment(data.id);
      if (response?.status === 200) {
        alert("댓글 삭제 완료!");
      }
    } catch (error) {
      console.log(error);
    }
     
  }

  // 댓글 좋아요 함수
  // 대댓글 처리 함수

  // 삭제된 댓글 출력 여부
  // if(data.commentUse === false) return null;
  return (
    <div>
      <div className='flex justify-between border-t py-2 mt-2'>
        <div className='flex gap-4'>
          <div>{data.accountId}</div>
          <div>{data.comment}</div>
          </div>
          {userId === data.accountId ?(
            <div className='flex items-center gap-2'>
              <BiSolidPencil />
              <MyModal func={DeleteComment}/>
            </div>
          ):
          // 좋아요 상태에 따른 아이콘 처리 해야 함!
          (<div><AiFillHeart /><AiOutlineHeart/></div>)}
      </div>
      <div className='flex items-center gap-2 justify-between'>
      {/* 좋아요 이벤트 처리 해야함! */}
        <div className='flex gap-2 items-center ml-2'>
          <BsArrowReturnRight />
          <textarea id="title" name="title" rows={1} className="w-[500px] block p-2.5 text-sm text-gray-900bg-gray-50 rounded-lg border
          border-gray-300" placeholder="댓글을 입력하세요..." />
          <button className='rounded-md p-2 bg-green-300 text-white'>등록</button>
       </div>
       <div className='font-thin'>좋아요 {data.commentLike}개</div>
      </div>
    </div>
  )
}

export default CommentComp