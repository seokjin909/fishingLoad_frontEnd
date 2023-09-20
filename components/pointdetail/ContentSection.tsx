import React from 'react'
import { Store } from "@/types/store"

interface Props {
    store: Store;
}

export const ContentSection = ({store}:Props) => {
  return (
    <div className='flex flex-col'>
      <div>{store.title}</div>
      <div>{store.contents}</div>
      <div>{store.fishtype}</div>
    </div>
  )
}