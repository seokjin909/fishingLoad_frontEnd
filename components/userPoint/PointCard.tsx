import { Store } from '@/types/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

type CardImage = { data : Store, id : number };
export default function PointCard({data,id}:CardImage) {

  const router = useRouter();
  const onClcikHandler = () => {
    router.push(`/detail/point/${id}`);
  }
  return (
    <div className='h-[200px] border border-gray-300 cursor-pointer relative' onClick={onClcikHandler}>
      {data.postImage && <Image src={data.postImage} objectFit="cover" objectPosition='center' alt='대표 이미지' layout="fill"/>}
      </div>
  )
}
