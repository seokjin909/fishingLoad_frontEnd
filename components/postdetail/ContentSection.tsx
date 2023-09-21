import React, { useEffect, useState } from 'react'
import { Store } from "@/types/store"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { likePost } from '@/pages/api/likePost';

interface Props {
    store: Store;
    userId : string;
}

type fullDateString = string;

export const ContentSection = ({store,userId}:Props) => {
  console.log(store);
  const [time, setTime] = useState<string>();
    useEffect(()=>{
        const fullDateString:fullDateString = store.createdTime;
        setTime(fullDateString?.split("T")[0]);
    },[store.createdTime])

    // 게시글 좋아요 기능 ( 서버 쪽 이슈 )
    const LikePost = async() => {
      const response = likePost(store.id);
    }

  return (
    <div className='flex flex-col w-full'>
      <div className='py-4  border-t-2 border-gray-300 flex justify-between'>
        <div className='font-thin'>{store.title}</div>
        <div className='flex justify-center gap-4'>
        {/* 로그인 한 회원일 경우 수정/삭제, 아닐 경우 좋아요 버튼 출력 =>   */}
        {userId === store.accountId ? (<div className='gap-2 flex'><button>수정</button><button>삭제</button></div>) : (<div className='text-red-400 text-2xl cursor-pointer' onClick={LikePost}><AiFillHeart /></div>)}
        <div className='font-thin'>좋아요 : {store.postLike}</div>
        </div>
        </div>
      <div className='py-4  border-t-2 border-dotted flex justify-between'>
        <div className='font-thin'>
          작성일 : {time}
        </div>
        <div className='font-thin'>
          작성자 : {store.accountId}
        </div>
      </div>
      <div className='py-4 border-t border-gray-300 min-h-[300px] font-thin'>{store.contents}</div>
    </div>
  )
}