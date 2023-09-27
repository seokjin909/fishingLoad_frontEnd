import { addPost } from '@/pages/api/post/addpost';
import { useRouter } from 'next/router';
import React, { useCallback, useState, useEffect } from 'react'
import Post from './SearchAddress';
import {MdDoubleArrow} from "react-icons/md"
import { BiSolidRightArrowCircle } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';

import Image from 'next/image';
import { toast } from 'react-toastify';

const FRESH_WATER_FISHS = '배스,쏘가리,붕어,잉어,가물치,강준치,메기,민물장어,송어,빙어,끄리,꺽지,누치,기타';
const SEA_FISHS = '우럭,광어,놀래미,삼치,농어,전갱이,고등어,볼락,숭어,화열기,열기,쏨뱅이,장대,성대,전어,꼬치고기,감성돔,벵에돔,긴꼬리벵에돔,돌돔,갈치,참돔,방어,부시리,가자미,도다리,자바리,대구,민어,능성어,다금바리,백조기,문어,무늬오징어,갑오징어,쭈구미,한치,바다장어,호래기,기타';

const AddPointForm = () => {

  // 1번이 바다, 2번이 민물;
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrlLists, setImageUrlLists] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(2);
  const [selectedFishTypes, setSelectedFishTypes] = useState<string[]>([]); // 선택한 어종들을 저장할 배열

  const [insertForm, setInsertForm] = useState({
    title: "",
    contents: "",
    categoryId : 2,
    fishtype:"",
    coordinates:[],
    locationdate:"",
  })
  const onChangeHandler = (event:any) => {
    const { name, value} = event.target;
      setInsertForm((data) => ({...data, [name]:value}));
  }

  const handleAddImages = (event: any) => {
    if (files.length === 3) {
      toast.warning('등록 가능한 이미지를 초과했습니다!');
      return;
    }
    const imageFiles = event.target.files;
    const newFiles = [...files];
    const newImageUrlLists = [...imageUrlLists];

    for (let i = 0; i < imageFiles.length; i++) {
      newFiles.push(imageFiles[i]);

      // 이미지 미리보기 URL을 추가
      const currentImageUrl = URL.createObjectURL(imageFiles[i]);
      newImageUrlLists.push(currentImageUrl);
    }

    if (newFiles.length > 3) {
      newFiles.splice(3); // 3개 이상인 경우 초과된 파일을 제거
      newImageUrlLists.splice(3);
    }

    setFiles(newFiles);
    setImageUrlLists(newImageUrlLists);
  };
  

  const handleDeleteImage = (id: number) => {
    const newFiles = [...files];
    const newImageUrlLists = [...imageUrlLists];

    newFiles.splice(id, 1);
    newImageUrlLists.splice(id, 1);

    setFiles(newFiles);
    setImageUrlLists(newImageUrlLists);
  };

  const handleCategoryChange = useCallback((categoryId:any) => {
    setInsertForm((prevInsertForm) => ({
      ...prevInsertForm,
      categoryId,
    }));
    setSelected(categoryId);
    setSelectedFishTypes([]);
  }, []);

  const handleFishTypeClick = (fishType: string) => {
    if (selectedFishTypes.includes(fishType)) {
      setSelectedFishTypes(selectedFishTypes.filter((item) => item !== fishType));
    } else {
      setSelectedFishTypes([...selectedFishTypes, fishType]);
    }
  }

  const SubmitHandler = async() => {
    const fishtype = selectedFishTypes.join(',');
    const updatedInsertForm = {
      ...insertForm,
      fishtype,
    };

    if (!insertForm.title.trim().length) {
      return toast.info("제목을 입력하세요... 😂");
    }
    if (!insertForm.contents.trim().length) {
      return toast.info("내용을 입력하세요... 😂");
    }
    if (!insertForm.locationdate.trim().length){
      return toast.info('주소를 입력하세요... 😂')
    }
    if(files.length < 1) {
      return toast.info('이미지를 추가해주세요... 😂')
    }
    if(!updatedInsertForm.fishtype.trim().length){
      return toast.info('어종을 선택해주세요... 😂')
    }
    

    try {
      const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(updatedInsertForm)], { type: "application/json" }));
    for(let i = 0; i < files.length; i++){
      formData.append("image", files[i]);
    }
      const response = await addPost(formData);
      if(response?.status !== 200) return;
      toast.success("등록 완료");
      router.replace('/point/mypoint');
    } catch(error) {
      console.log(error);
    }
  }

  // 카테고리 기준 변경

  return (
    <div className='mt-10'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <div className='text-blue-500'><MdDoubleArrow /></div>
            <div className='font-bold text-md text-gray-600'>테마선택</div>
          </div>
          <div className='gap-2 flex font-normal'>
            {selected === 1 ? (
              <>
              <button className='common-button' onClick={()=>handleCategoryChange(2)}>#민물</button>
              <button className="selected-button">#바다</button>
              </>
            ):(
              <>
              <button className="selected-button" >#민물</button>
              <button className='common-button' onClick={()=>handleCategoryChange(1)}>#바다</button>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center gap-4 mt-6'>
          <div className='flex items-center gap-1 flex-none'>
            <div className='text-blue-500'><MdDoubleArrow /></div>
            <div className='font-bold text-md text-gray-600'>어종선택</div>
          </div>
          <div className='gap-2 flex flex-wrap'>
            {selected === 1 ? (
            SEA_FISHS.split(',').map((name) => {
              const isSelected = selectedFishTypes.includes(name);
              return (
                <button
                  key={name}
                  className={isSelected ? 'selected-button' : "common-button"}
                  onClick={() => handleFishTypeClick(name)}
                >
                  #{name}
                </button>
              );
            })
          ) : (
            FRESH_WATER_FISHS.split(',').map((name) => {
              const isSelected = selectedFishTypes.includes(name);
              return (
                <button
                  key={name}
                  className={isSelected ? 'selected-button' : "common-button"}
                  onClick={() => handleFishTypeClick(name)}
                >
                  #{name}
                </button>
              );
            })
          )}
          </div>
        </div>
        <hr className='my-6'/>
        <label htmlFor="title" className="my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>제목</label>
        <input type='text' id="title" required name="title" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="컨텐츠 제목을 입력해주세요." onChange={onChangeHandler}/>
        <label htmlFor="contents" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>내용</label>
        <textarea onChange={onChangeHandler} required
        id="contents" name='contents' rows={4} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력해주세요." />
        <div className='flex justify-between items-center'>
        <label htmlFor="locationdate" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>위치</label>
        </div>
        <div className='flex flex-none'>
        <input onChange={onChangeHandler} disabled
        id="locationdate" name='locationdate' value={insertForm.locationdate || ""} className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="주소 검색을 이용해주세요."/>
        <Post setInsertForm={setInsertForm} insertForm={insertForm}/>
        </div>
        <label htmlFor="image" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>이미지</label>
        <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">버튼을 클릭하거나</span> 또는 드래그</p>
            <p className="text-xs text-gray-500">최대 3장까지 등록 가능합니다</p>
        </div>
        <input id="dropzone-file" name='file' type="file" className="hidden" multiple onChange={handleAddImages} accept='image/*' />
    </label>
    </div> 
    {imageUrlLists.length === 0 ? (<></>) : (
      <div>
    <label htmlFor="previewimage" className="mt-4 my-2 text-sm font-bold flex items-center gap-1 text-blue-500"><BiSolidRightArrowCircle/>이미지 미리보기</label>
      <div className='flex justify-evenly'>
      {imageUrlLists && imageUrlLists.map((image, id) => (
          <div key={id} className='relative'>
            <Image src={image} width={200} height={200} alt={`${image}-${id}`} />
            <button className='transition-all text-2xl absolute top-0 right-0 hover:scale-150' onClick={()=>handleDeleteImage(id)}><TiDelete/></button>
          </div>
        ))}
        </div>
        </div>
    )}
        <div className='flex justify-center mt-10'>
          <button className='bg-blue-500 text-white rounded-md py-3 px-20 font-bold transition-all hover:bg-blue-600' onClick={SubmitHandler}>신규 포인트 등록하기</button>
          </div>
    </div>
  )
}

export default AddPointForm