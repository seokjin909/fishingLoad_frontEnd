import React from 'react'
import AddComment from './AddComment';
import { AiFillHeart, AiOutlineHeart, AiFillDelete} from "react-icons/ai"
import { BiSolidPencil} from "react-icons/bi"
import { BsArrowReturnRight } from "react-icons/bs"

interface Props {
    data : Comment;
}
const Comment = ({data}:Props) => {
  return (
    <div>
      <div className='flex justify-between border-t py-2 mt-2'>
        <div className='flex gap-4'>
          <div>{data.accountId}</div>
          <div>{data.comment}</div>
          </div>
          <div className='flex items-center gap-2'>
            {/* 비작성자가 보이는 화면 */}
            <AiFillHeart />
            {/* 작성자만 보이는 버튼 */}
            <BiSolidPencil />
            <AiFillDelete />
          </div>
      </div>
      <div className='flex items-center gap-2 justify-between'>
      {/* 좋아요 이벤트 처리 해야함! */}
        {/* 댓글 달기 버튼 클릭 시 등장 */}
        <div className='flex gap-2 items-center ml-2'>
          <BsArrowReturnRight />
          <textarea id="title" name="title" rows={1} className="w-[500px] block p-2.5 text-sm text-gray-900bg-gray-50 rounded-lg border
          border-gray-300" placeholder="댓글을 입력하세요..." />
          <button className='rounded-md p-2 bg-green-300 text-white'>등록</button>
       </div>
       <div>❤️ {data.commentLike}</div>
      </div>
    </div>
  )
}

export default Comment