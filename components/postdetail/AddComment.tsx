import { addComment } from '@/pages/api/addComment';
import { Comment, Store } from '@/types/store';
import React, { ReactElement, useCallback, useState } from 'react'


interface Props {
  store : Store;
  comments : Store['commentList'];
  setComments:React.Dispatch<React.SetStateAction<Comment[]>>;
}
const AddComment = ({store,setComments, comments}:Props) => {
  console.log(comments);
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
    console.log(data);
    try {
      const response = await addComment(data);
      if(response?.status === 200) {
        alert("등록 완료!");
        setData({
          comment : "",
          postId : store.id
        });
        setComments((prevComments)=>[...prevComments, response.data]);
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='border-t border-gray-300 pt-4 flex justify-between items-center w-full'>
      <textarea id="comment" name="comment" rows={2} className="w-full block p-2.5 text-sm text-gray-900bg-gray-50 rounded-lg border
       border-gray-300" placeholder="댓글을 입력하세요..." onChange={onChangeHandler}/>
       <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' onClick={onSumbitHandler}>등록</button>
    </div>
  )
}

export default AddComment