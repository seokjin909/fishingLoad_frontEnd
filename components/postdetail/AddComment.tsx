'use client'
import { addComment } from '@/pages/api/comment/addComment';
import { Comment, Store } from '@/types/store';
import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useEffect, useState } from 'react'


interface Props {
  store : Store;
  comments : Store['commentList'];
  setComments:React.Dispatch<React.SetStateAction<Comment[]>>;
}
const AddComment = ({store,setComments, comments}:Props) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(()=>{
    const isToken = localStorage.getItem('authorization');
    if(isToken !== null){
      setToken(isToken);
    } else {
      setToken("");
    }
  },[token])
  const [data, setData] = useState({
    comment : "",
    postId : store.id
  });

  const onChangeHandler = useCallback((e:any) => {
      const addObj = {
        ...data,
        [e.target.name] : e.target.value,
      };
      setData(addObj);
  },[data])

  const onSumbitHandler = async () => {
    if(token === ""){
      alert('로그인이 필요한 기능입니다!');
      router.push('/user/login');
      return;
    }
    try {
      if (!data.comment.trim().length) {
        return alert("내용을 입력하세요... 😂");
      }
      const response = await addComment(data);
      if(response?.status === 200) {
        alert("등록 완료!");
        setData({
          comment : "",
          postId : store.id
        });
        setComments((comments)=>[...comments, response.data]);
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='border-t border-gray-300 pt-4 flex justify-between items-center w-full'>
      <textarea id="comment" name="comment" rows={2} className="w-full block p-2.5 text-sm text-gray-900bg-gray-50 rounded-lg border
       border-gray-300" placeholder="댓글을 입력하세요..." onChange={onChangeHandler} value={data.comment}/>
       <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={onSumbitHandler}>등록</button>
    </div>
  )
}

export default AddComment