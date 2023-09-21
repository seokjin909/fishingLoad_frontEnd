import { Store } from '@/types/store'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
interface Props {
    data : Store;
    index : number;
}

const CommunityCard = ({data, index}:Props) => {
    const router = useRouter();
    const onClickHandler = () => {
        router.push(`/detail/post/${data.id}`);
    }
    const [time, setTime] = useState<string>();
    useEffect(()=>{
        const fullDateString = data.createdTime;
        const realTime = fullDateString?.split("T")[0]
        setTime(realTime);
    },[data.createdTime])
    

  return (
    <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer" onClick={onClickHandler}>
                    {data.title}
                </th>
                <td className="px-6 py-4">
                    {data.accountId}
                </td>
                <td className="px-6 py-4">
                    {time}
                </td>
                <td className="px-6 py-4">
                    {data.postLike}
                </td>
            </tr>
  )
}

export default CommunityCard