import React from 'react'

type CardImage = { key : number, image : string };
export default function PointCard({image}:CardImage) {
  return (
    <div className='h-[200px] border border-gray-300'>{image}</div>
  )
}
