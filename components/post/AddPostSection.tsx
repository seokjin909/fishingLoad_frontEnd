import React, { useEffect } from 'react'
import AddPostForm from './AddPostForm'
import { useRouter } from 'next/router'

const AddPostSection = () => {
  
  // 해당 로직처럼 useEffect 처럼 return 문이 실행되기 전에 세션(토큰) 값을 받아와서 없을 경우 출력을 처리하지도 않고 바로 redirect 하는 방식으로 수정해야 함!
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/");

  return (
    <div className='flex flex-col'>
    <div>게시글 등록 영역</div>
    <AddPostForm />
    </div>
  )
}

export default AddPostSection