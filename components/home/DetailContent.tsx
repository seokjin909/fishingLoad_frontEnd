import type { Store } from '../../types/store';
import { MdDriveFileRenameOutline } from "react-icons/md"
import { SlSpeech } from "react-icons/sl"
import { FaMapLocationDot } from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useRouter } from 'next/router';

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
              <div>이미지 영역</div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  이름 <MdDriveFileRenameOutline />
                </div>
                <div>
                  {currentStore.title}
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  설명 <SlSpeech />
                </div>
                <div>
                  {currentStore.contents}
                </div>
              </div>
              <div className='flex'>
                <div className='flex items-center mr-2 gap-1 font-bold'>
                  위치 <FaMapLocationDot />
                </div>
                <div>
                  {currentStore.Locationdate}
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
