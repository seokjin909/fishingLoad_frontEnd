import { Store } from '@/types/store'
import Link from 'next/link';
import React from 'react'
interface Props {
    data : Store;
}

const CommunityCard = ({data}:Props) => {
  return (
    <tr className="bg-white border-b">
        <Link href={`/detail/${data.id}`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.title}
                </th>
                </Link>
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