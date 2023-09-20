import React from 'react'
import AddPostForm from './AddPostForm'

const AddPostSection = () => {
  return (
    <div className='flex flex-col'>
    <div>게시글 등록 영역</div>
    <AddPostForm />
    </div>
  )
}

export default AddPostSection