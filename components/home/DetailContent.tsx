import type { Store } from '../../types/store';
import { MdDriveFileRenameOutline } from "react-icons/md"
import { SlSpeech } from "react-icons/sl"
import { FaMapLocationDot, FaRegCommentDots } from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

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
        {!currentStore && <div className='flex items-center font-thin'>좌측의 &nbsp;<p className='text-red-400 font-bold'>마커</p>를 선택해주세요 &nbsp;<FaMapMarkerAlt /></div>}
        {currentStore && (
            <div>
              <div className='border border-gray-300 w-[300px] h-[300px] text-center'></div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  <MdDriveFileRenameOutline />
                  {currentStore.title}
                </div>
                <div>
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  <SlSpeech />
                </div>
                <div>
                  {currentStore.contents}
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  <FaMapLocationDot />
                </div>
                <div>
                  {currentStore.locationdate}
                </div>
              </div>
              <button onClick={onClickHandler} className="absolute bottom-0 right-0 m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                상세페이지로
              </button>
            </div>
        )}
      </div>
  );
};
export default DetailContent;
