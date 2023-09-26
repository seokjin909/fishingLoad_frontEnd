import { addPost } from '@/pages/api/post/addpost';
import { addImage } from '@/pages/api/post/addimage';
import { useRouter } from 'next/router';
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import React, { useCallback,useState } from 'react'
import Image from 'next/image';
import { TiDelete } from 'react-icons/ti';

const AddPostForm = () => {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [insertForm, setInsertForm] = useState({
    title: "",
    contents: "",
    categoryId : 3
  })


  const handleAddImages = (event:any) => {
    if(files.length === 3) {
      alert('등록 가능한 이미지를 초과했습니다!')
      return;
    }
    const imageLists = event.target.files;
    let imageUrlLists = [...files];

    for (let i = 0; i < imageLists.length; i++){
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0,3);
    }
    setFiles(imageUrlLists);
  }
  
  const handleDeleteImage = (id:number) => {
    setFiles(files.filter((_,index) => index !== id));
  }

  const onChangeHandler = useCallback((event:any) => {
      const joinObj = {
        ...insertForm,
        [event.target.name]: event.target.value,
      };
      setInsertForm(joinObj);
  },[insertForm])

  const SubmitHandler = async() => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(insertForm)], { type: "application/json" }));
    for(let i = 0; i < files.length; i++){
      formData.append("image", files[i]);
    }
    if (!insertForm.title.trim().length) {
      return alert("제목을 입력하세요... 😂");
    }
    if (!insertForm.contents.trim().length) {
      return alert("내용을 입력하세요... 😂");
    }
    
    try {
      const rep = await addImage(formData);
      console.log(rep);
      const response = await addPost(insertForm);
      if(response?.status === 200) {
        alert("작성 완료!");
        router.push('/community');
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='mt-4'>
        <label htmlFor="title" className="my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>제목</label>
        <input id="title" name="title" className="block p-2.5 w-full text-sm text-gray-900bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="게시글 제목을 입력해주세요." onChange={onChangeHandler}/>
        <label htmlFor="contents" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>내용</label>
        <textarea onChange={onChangeHandler}
        id="contents" name='contents' rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력해주세요."></textarea>
        <label htmlFor="image" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>이미지</label>
        <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">버튼을 클릭하거나</span> 또는 드래그</p>
            <p className="text-xs text-gray-500">최대 3장까지 등록 가능합니다</p>
        </div>
        <input id="dropzone-file" onChange={handleAddImages} name='file' type="file" className="hidden" multiple accept='image/*' />
    </label>
    </div> 
    {files.length === 0 ? (<></>) : (
      <div>
    <label htmlFor="previewimage" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>이미지 미리보기</label>
      <div className='flex justify-evenly'>
      {files && files.map((image, id) => (
          <div key={id} className='relative'>
            <Image src={image} width={200} height={200} alt={`${image}-${id}`} />
            <button className='transition-all text-2xl absolute top-0 right-0 hover:scale-150' onClick={()=>handleDeleteImage(id)}><TiDelete/></button>
          </div>
        ))}
        </div>
        </div>
    )}
    <div className='flex justify-center gap-10 mt-10'>
          <button className='bg-white text-blue-500 rounded-md py-3 px-20 font-bold transition-all hover:bg-blue-600 hover:text-white' onClick={SubmitHandler}>취소하기</button>
          <button className='bg-blue-500 text-white rounded-md py-3 px-20 font-bold transition-all hover:bg-blue-600' onClick={SubmitHandler}>등록하기</button>
          </div>
    </div>
  )
}

export default AddPostForm