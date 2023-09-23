import React, { useEffect, useState } from 'react'
import { Store } from "@/types/store"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { likePost } from '@/pages/api/post/likePost';
import { useRouter } from 'next/router';
import { deletePostAPI } from '@/pages/api/post/deletePost';
import MyModal from '../common/DeleteModal';
import UpdateModal from '../common/UpdateModal';

interface Props {
    store: Store;
    userId : string;
}

type fullDateString = string;

export const ContentSection = ({store,userId}:Props) => {
  const router = useRouter();
  const [time, setTime] = useState<string>();
    useEffect(()=>{
        const fullDateString:fullDateString = store.createdTime;
        setTime(fullDateString?.split("T")[0]);
    },[store.createdTime])

    // 게시글 좋아요 기능 ( 서버 쪽 이슈 )
    const LikePost = () => {
      if(userId === "") {
        alert("로그인이 필요한 기능입니다!");
        router.push('/user/login');
        return;
      } else {
        const response = likePost(store.id);
      }
    }


    const UpdatePost = async() => {
        router.push(`/post/update/${store.id}`);
    }
    const DeletePost = async() => {
      const response = await deletePostAPI(store.id);
      if(response?.status === 200) {
        alert('게시글이 삭제되었습니다!');
        router.push('/community');
        return;
      } else {
        alert('API 통신에 에러가 발생하였습니다 💩');
      }
    }

  return (
    <div className='flex flex-col w-full'>
      <div className='py-4  border-t-2 border-gray-300 flex justify-between'>
        <div className='font-thin'>{store.title}</div>
        <div className='flex justify-center gap-4'>
        <div className='font-thin'>좋아요 : {store.postLike}</div>
        {/* 로그인 한 회원일 경우 수정/삭제, 아닐 경우 좋아요 버튼 출력 =>   */}
        {userId === store.accountId ? (<div className='gap-2 flex'>
        <UpdateModal type='게시글' func={UpdatePost} />
        <MyModal type='게시글' func={DeletePost} /></div>) : (<div className='text-red-400 text-2xl cursor-pointer' onClick={LikePost}><AiFillHeart /></div>)}
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