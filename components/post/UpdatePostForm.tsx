import { addPost } from '@/pages/api/post/addpost';
import { updatePostAPI } from '@/pages/api/post/updatePost';
import { Store } from '@/types/store';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import { BiSolidRightArrowCircle } from 'react-icons/bi';

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
    <div>
        <label htmlFor="title" className="my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>제목</label>
        <input id="title" value={insertForm.title} name="title" className="block p-2.5 w-full text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="제목을 입력해주세요." onChange={onChangeHandler}/>
        <label htmlFor="contents" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>내용</label>
        <textarea onChange={onChangeHandler}
        value={insertForm.contents}
        id="contents" name='contents' rows={4} className="p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력해주세요."></textarea>
        <div className='flex justify-center gap-10 mt-10'>
          <button onClick={()=>router.push(`/detail/post/${store.id}`)} className='bg-white text-blue-500 rounded-md py-3 px-20 font-bold transition-all hover:bg-blue-600 hover:text-white'>취소하기</button>
          <button className='bg-blue-500 text-white rounded-md py-3 px-20 font-bold transition-all hover:bg-blue-600' onClick={SubmitHandler}>등록하기</button>
          </div>
        </div>
  )
}

export default UpdatePostForm