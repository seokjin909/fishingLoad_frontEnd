import React from 'react'
import CommunityCard from './CommunityCard'
import { Store } from '@/types/store'
import { useRouter } from 'next/router';

interface Props {
    data : Store[];
}

export const CommunitySection = ({data}:Props) => {
    const router = useRouter();
    const onClickHandler = () => {
        router.push('/post/addpost');
    }
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 border-t-2 border-black">
        <thead className="text-xs text-black uppercase bg-gray-100 border-b">
            <tr>
                <th scope="col" className="px-6 py-3">
                    번호
                </th>
                <th scope="col" className="px-6 py-3">
                    제목
                </th>
                <th scope="col" className="px-6 py-3">
                    작성자
                </th>
                <th scope="col" className="px-6 py-3">
                    등록일
                </th>
                <th scope="col" className="px-6 py-3">
                    좋아요
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map((item,index) => {
                return <CommunityCard key={item.id} data={item} index={index+1}/>
            })}
        </tbody>
    </table>
    <div className='float-right mt-4 bg-blue-400 py-2 px-4 rounded-md text-white cursor-pointer' onClick={onClickHandler}>
        글쓰기
    </div>
</div>

  )
}
