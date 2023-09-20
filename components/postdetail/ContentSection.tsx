import React from 'react'
import { Store } from "@/types/store"

interface Props {
    store: Store;
}

export const ContentSection = ({store}:Props) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='py-4  border-t-2 border-gray-300 flex justify-between'>
        <div className='font-thin'>{store.title}</div>
        <div className='font-thin'>좋아요 : 20</div>
        </div>
      <div className='py-4  border-t-2 border-dotted flex justify-between'>
        <div className='font-thin'>
          작성일 : 2023-09-20
        </div>
        <div className='font-thin'>
          작성자 : {store.userId}
        </div>
      </div>
      <div className='py-4 border-t border-gray-300 min-h-[300px] font-thin'>{store.contents}</div>
    </div>
  )
}