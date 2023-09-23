import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import UpdatePostForm from './UpdatePostForm'
import { Store } from '@/types/store'

interface Props {
    store : Store
}

const UpdatePostSection = ({store}:Props) => {
  
  // 해당 로직처럼 useEffect 처럼 return 문이 실행되기 전에 세션(토큰) 값을 받아와서 없을 경우 출력을 처리하지도 않고 바로 redirect 하는 방식으로 수정해야 함!
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/");

  return (
    <div className='flex flex-col'>
    <div>게시글 수정 영역</div>
    <UpdatePostForm store={store}/>
    </div>
  )
}

export default UpdatePostSection