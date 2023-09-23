import { addPost } from '@/pages/api/addpost';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react'
import Post from './SearchAddress';

const AddPointForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [insertForm, setInsertForm] = useState({
    title: "",
    contents: "",
    categoryId : 0,
    fishtype:"",
    coordinates:[],
    locationdate:"",
  })
  const onChangeHandler = useCallback((event:any) => {
      const joinObj = {
        ...insertForm,
        [event.target.name]: event.target.value,
      };
      setInsertForm(joinObj);
  },[insertForm])

  const SubmitHandler = async() => {
    console.log(insertForm);
    if (!insertForm.title.trim().length) {
      return alert("제목을 입력하세요... 😂");
    }
    if (!insertForm.contents.trim().length) {
      return alert("내용을 입력하세요... 😂");
    }
    if (!insertForm.locationdate.trim().length){
      return alert('주소를 입력하세요... 😂')
    }
    try {
      const response = await addPost(insertForm);
      if(response?.status === 200) {
        alert("작성 완료!");
        router.push('/community');
      }
    } catch(error) {
      console.log(error);
    }
  }
  return (
    <div className='w-[500px]'>
        <label htmlFor="title" className="block my-2 text-sm font-medium text-gray-900">제목</label>
        <textarea id="title" name="title" rows={1} className="block p-2.5 w-full text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="제목을 입력하세요..." onChange={onChangeHandler}></textarea>
        <label htmlFor="contents" className="block my-2 text-sm font-medium text-gray-900">내용</label>
        <textarea onChange={onChangeHandler}
        id="contents" name='contents' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력하세요..."></textarea>
        <label htmlFor="fishtype" className="block my-2 text-sm font-medium text-gray-900">어종</label>
        <textarea onChange={onChangeHandler}
        id="fishtype" name='fishtype' rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="어종을 입력하세요..."></textarea>
        <div className='flex justify-between'>
        <label htmlFor="locationdate" className="block my-2 text-sm font-medium text-gray-900">주소</label>
        <button className="text-sm px-2 py-1 bg-gray-300 rounded-lg" onClick={()=>setOpen(!open)}>우편번호 찾기</button>
        </div>
        <textarea onChange={onChangeHandler}
        id="locationdate" name='locationdate' rows={1} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="주소를 입력하세요..."></textarea>
        <div>
          {open && <Post setInsertForm={setInsertForm} insertForm={insertForm}/>}
        </div>
        <label className="block my-2 text-sm font-medium text-gray-900" htmlFor="user_avatar">파일 업로드</label>
        <input className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
        <div className='grid grid-cols-2 mt-2 border border-gray-400 h-10'>
          <button className='border-r border-black font-thin'>취소하기</button>
          <button className='font-thin text-blue-400' onClick={SubmitHandler}>등록하기</button>
        </div>
        
    </div>
  )
}

export default AddPointForm