import React, { useEffect, useState } from 'react'
import { Store } from "@/types/store"
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { likePost } from '@/pages/api/post/likePost';
import { useRouter } from 'next/router';
import { deletePostAPI } from '@/pages/api/post/deletePost';
import MyModal from '../common/DeleteModal';
import UpdateModal from '../common/UpdateModal';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Props {
    store: Store;
    userId : string;
    setStore:React.Dispatch<React.SetStateAction<Store>>
}

type fullDateString = string;

export const ContentSection = ({store,userId,setStore}:Props) => {
  console.log(store);
  const router = useRouter();
  const [time, setTime] = useState<string>();
    useEffect(()=>{
        const fullDateString:fullDateString = store.createdTime;
        setTime(fullDateString?.split("T")[0]);
    },[store.createdTime])

    // 게시글 좋아요 기능 ( 서버 쪽 이슈 )
    const LikePost = async() => {
      if(userId === "") {
        toast.info('로그인이 필요한 서비스입니다.');
        router.push('/user/login');
        return;
      } else {
        const response = await likePost(store.id);
        if(response?.data.statusCode === 200) {
          toast.success(response.data.message);
          const updatedStore = { ...store }; // store 객체를 복제합니다.
          if (store.postLikeUse) {
            // 이미 좋아요를 누른 상태였다면 감소
            updatedStore.postLike -= 1;
          } else {
            // 좋아요를 누르지 않은 상태였다면 증가
            updatedStore.postLike += 1;
          }
          updatedStore.postLikeUse = !store.postLikeUse; // 상태를 토글합니다.
          setStore(updatedStore);
        }
      }
    }


    const UpdatePost = async() => {
        router.push(`/post/update/${store.id}`);
    }
    const DeletePost = async() => {
      try {
        const response = await deletePostAPI(store.id);
        if(response?.status === 200) {
          toast.success('게시글이 삭제되었습니다');
          router.push('/community');
          return;
        } 
       } catch (error) {
        console.log(error);
       }
    }

  return (
    <div className='flex flex-col w-full'>
      <div className='py-4  border-t-2 border-gray-300 flex justify-between'>
        <div className='font-bold'>{store.title}</div>
        <div className='flex justify-center gap-4'>
        <div className='font-semibold'>좋아요 : {store.postLike}</div>
        {userId === store.accountId ? (<div className='gap-2 flex'>
        <UpdateModal type='게시글' func={UpdatePost} />
        <MyModal type='게시글' func={DeletePost} /></div>) :
        (
        <div className='text-red-400 text-2xl cursor-pointer' onClick={LikePost}>
          {store.postLikeUse ? (<AiFillHeart />):(<AiOutlineHeart />)}
          </div>
        )}
        </div>
        </div>
      <div className='py-4  border-y-2 border-dotted flex justify-between'>
        <div className='font-normal'>
          작성일 : {time}
        </div>
        <div className='font-normal'>
          작성자 : {store.accountId}
        </div>
      </div>
      <div className='flex flex-col'>
      {store.postImageList && store.postImageList.map((item)=> {
        return <Image src={item.imageUrl} width={300} height={300} alt='게시글 이미지' key={item.imagePath}/>
      })}
      </div>
      <div className='py-4 border-gray-300 min-h-[300px]'>{store.contents}</div>
    </div>
  )
}