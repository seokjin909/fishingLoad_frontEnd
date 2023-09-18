import type { Store } from '../../types/store';

type Props = {
  currentStore?: Store;
};

const DetailContent = ({ currentStore }: Props) => {
  return (
      <div className="font-semibold">
        {!currentStore && <p>🔍 상단의 포인트를 선택해주세요</p>}
        {currentStore && (
            <div>
            <p>제목 : {currentStore.title}</p>
            <p>설명 : {currentStore.contents}</p>
            <span className='flex justify-between items-center w-[500px]'>
            <p>위치 : {currentStore.Locationdate}</p>
            <button className='border border-gray-400 rounded-sm p-1'>상세페이지로</button>
            </span>
            </div>
        )}
      </div>
  );
};
export default DetailContent;
