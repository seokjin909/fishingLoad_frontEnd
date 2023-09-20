import { Store } from '@/types/store'
import { useRouter } from 'next/router';
import React from 'react'
interface Props {
    data : Store;
    index : number;
}

const CommunityCard = ({data, index}:Props) => {
    const router = useRouter();
    const onClickHandler = () => {
        router.push(`/detail/post/${data.id}`);
    }
  return (
    <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" onClick={onClickHandler}>
                    {index}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer" onClick={onClickHandler}>
                    {data.title}
                </th>

                <td className="px-6 py-4">
                    {data.userId}
                </td>
                <td className="px-6 py-4">
                    {data.id}
                </td>
                <td className="px-6 py-4">
                    {data.category.id}
                </td>
            </tr>
  )
}

export default CommunityCard