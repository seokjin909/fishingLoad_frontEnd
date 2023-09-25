import { useRouter } from 'next/router';
import React from 'react'

type CardImage = { id : number, image : string };
export default function PointCard({image,id}:CardImage) {

  const router = useRouter();
  const onClcikHandler = () => {
    router.push(`/detail/point/${id}`);
  }
  return (
    <div className='h-[200px] border border-gray-300' onClick={onClcikHandler}>{image}</div>
  )
}
