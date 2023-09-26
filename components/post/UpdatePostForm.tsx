import { addPost } from '@/pages/api/post/addpost';
import { updatePostAPI } from '@/pages/api/post/updatePost';
import { Store } from '@/types/store';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'

interface Props {
    store : Store;
}

const UpdatePostForm = ({store}:Props) => {
  const router = useRouter();
  const [insertForm, setInsertForm] = useState({
    title: store.title,
    contents: store.contents,
    categoryId : 3
  })
  const onChangeHandler = useCallback((event:any) => {
      const joinObj = {
        ...insertForm,
        [event.target.name]: event.target.value,
      };
      setInsertForm(joinObj);
  },[insertForm])

  const SubmitHandler = async() => {
    if (!insertForm.title.trim().length) {
      return alert("제목을 입력하세요... 😂");
    }
    if (!insertForm.contents.trim().length) {
      return alert("내용을 입력하세요... 😂");
    }
    try {
      const response = await updatePostAPI(store.id,insertForm);
      if(response?.status === 200) {
        alert("수정 완료!");
        router.push(`/detail/post/${store.id}`);
      }
    } catch(error) {
      console.log(error);
    }
  }
  return (
    <div className='w-[500px]'>
        <label htmlFor="title" className="block my-2 text-sm font-medium text-gray-900">제목</label>
        <textarea id="title" name="title" rows={1} value={insertForm.title} className="block p-2.5 w-full text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="제목을 입력하세요..." onChange={onChangeHandler}></textarea>
        <label htmlFor="contents" className="block my-2 text-sm font-medium text-gray-900">내용</label>
        <textarea onChange={onChangeHandler}
        value={insertForm.contents}
        id="contents" name='contents' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력하세요..."></textarea>
        <label className="block my-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">파일 업로드</label>
        <input className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
        <div className='grid grid-cols-2 mt-2 border border-gray-400 h-10'>
          <button className='border-r border-black font-thin' onClick={()=>router.push(`/detail/post/${store.id}`)}>취소하기</button>
          <button className='font-thin text-blue-400' onClick={SubmitHandler}>수정하기</button>
        </div>
        
    </div>
  )
}

export default UpdatePostForm