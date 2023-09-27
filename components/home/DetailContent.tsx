import type { Store } from '../../types/store';
import { MdDriveFileRenameOutline } from "react-icons/md"
import { SlSpeech } from "react-icons/sl"
import { FaMapLocationDot, FaRegCommentDots } from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useRouter } from 'next/router';
import Image from 'next/image';

type Props = {
  currentStore?: Store;
};

const DetailContent = ({ currentStore }: Props) => {
  const router= useRouter();
  const onClickHandler = () => {
    router.push(`/detail/point/${currentStore?.id}`);
  }
  return (
      <div className="truncate">
        {!currentStore && <div className='flex items-center font-bold text-gray-500'>좌측의 &nbsp;<p className='text-red-400 font-bold'>마커</p>를 선택해주세요 &nbsp;<FaMapMarkerAlt /></div>}
        {currentStore && (
            <div>
              <div className='w-[300px] h-[300px] text-center relative'>
              {currentStore.postImage && <Image src={currentStore.postImage} layout='fill' objectFit='cover' objectPosition='center' alt='대표 이미지'/>}
              </div>
              <div className='flex mt-2'>
              <div className='flex items-center mr-2 gap-1 font-bold'>
                  이름 <MdDriveFileRenameOutline />
                </div>
                <div>
                  {currentStore.title.length > 9 ? `${currentStore.title.slice(0,9)}..` : currentStore.title}
                </div>   
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  설명 <SlSpeech />
                </div>
                <div>
                  {currentStore.contents.length > 9 ? `${currentStore.contents.slice(0,9)}..` : currentStore.contents}
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  위치 <FaMapLocationDot />
                </div>
                <div>
                  {currentStore.locationdate.length > 9 ? `${currentStore.locationdate.slice(0,9)}..` : currentStore.locationdate}
                </div>
              </div>
              <button onClick={onClickHandler} className="absolute bottom-0 right-0 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
                상세페이지로
              </button>
            </div>
        )}
      </div>
  );
};
export default DetailContent;
