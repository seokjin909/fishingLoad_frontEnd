import type { Store } from '../../types/store';
import { MdDriveFileRenameOutline } from "react-icons/md"
import { SlSpeech } from "react-icons/sl"
import { FaMapLocationDot } from "react-icons/fa6"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useRouter } from 'next/router';

type Props = {
  currentStore?: Store;
  state : boolean;
};

const DetailContent = ({ currentStore,state }: Props) => {
  const router= useRouter();
  const onClickHandler = () => {
    router.push(`/detail/point/${currentStore?.id}`);
  }
  const addPointNavigation = () => {
    router.push('/point/addpoint');
  }
  return (
      <div className="truncate">
        {!state && (<div className='flex gap-2 flex-col items-center'>
          <div className='font-bold text-2xl flex items-center mb-4'>등록된&nbsp; <p className='text-red-400'>포인트</p>&nbsp;<FaMapLocationDot />&nbsp;가 없습니다</div>
          <div className='flex items-center text-lg font-semibold'>나만의 포인트를&nbsp; <button className='flex items-center px-2 py-1 bg-blue-300 rounded-lg mr-1' onClick={addPointNavigation}>추가 <FaMapMarkerAlt /></button>&nbsp;해보세요!</div>
          </div>)}
        {state && !currentStore && <div className='flex items-center font-thin'>좌측의 &nbsp;<p className='text-red-400 font-bold'>마커</p>를 선택해주세요 &nbsp;<FaMapMarkerAlt /></div>}
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
