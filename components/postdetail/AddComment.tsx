import React from 'react'

const AddComment = () => {
  return (
    <div className='border-t border-gray-300 pt-4 flex justify-between items-center w-full'>
      <textarea id="title" name="title" rows={2} className="w-full block p-2.5 text-sm text-gray-900bg-gray-50 rounded-lg border
       border-gray-300" placeholder="댓글을 입력하세요..." />
       <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>등록</button>
    </div>
  )
}

export default AddComment