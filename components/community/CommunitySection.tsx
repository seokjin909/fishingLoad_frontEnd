import React from 'react'
import CommunityCard from './CommunityCard'
import { Store } from '@/types/store'
import { useRouter } from 'next/router';
import { SlNote } from 'react-icons/sl';
import { toast } from 'react-toastify';

interface Props {
    data : Store[];
}

export const CommunitySection = ({data}:Props) => {
    const router = useRouter();
    const onClickHandler = () => {
        const token = localStorage.getItem('authorization');
        if(token === null){
            toast.info('로그인이 필요한 서비스입니다.');
            router.push('/user/login');
            return;
        }
        router.push('/post/addpost');
    }
  return (
    <div className="relative overflow-x-auto w-[1200px] mt-8">
        <div className='flex items-center font-bold p-1 gap-2 mb-4'>
            <div className='text-2xl border rounded-full p-2 bg-blue-500 text-white'><SlNote /></div>
            <div className='font-bold'>
                <div className='text-2xl'>자유게시판</div>
                <div className='text-xs'>FREE BOARD</div>
            </div>
        </div>
    <table className="w-full text-md text-left text-gray-500 font-bold">
        <thead className="text-xs text-black uppercase bg-gray-100 border-b">
            <tr>
                <th scope="col" className="px-6 py-3 w-20">
                    번호
                </th>
                <th scope="col" className="px-6 py-3 w-60">
                    제목
                </th>
                <th scope="col" className="px-6 py-3 w-20">
                    작성자
                </th>
                <th scope="col" className="px-6 py-3 w-40">
                    등록일
                </th>
                <th scope="col" className="px-6 py-3 w-32">
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
