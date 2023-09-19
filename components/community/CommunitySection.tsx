import React from 'react'
import CommunityCard from './CommunityCard'
import { Store } from '@/types/store'

interface Props {
    data : Store[];
}

export const CommunitySection = ({data}:Props) => {
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
        <thead className="text-xs text-black uppercase bg-white-50 border-b">
            <tr>
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
            {data.map(item => {
                return <CommunityCard key={item.id} data={item}/>
            })}
        </tbody>
    </table>
</div>

  )
}
