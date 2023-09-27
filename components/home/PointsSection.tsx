import useSWR from 'swr';
import type { Store } from '../../types/store';
import { STORE_KEY } from "../../hooks/usePoint";
import PointCard from './PointCard';
import { useEffect } from 'react';

const PointsSection = () => {
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  if (!stores) return null;
  return (
    <div
      className="flex flex-col w-[1200px] h-[700px] mt-10"
    >
      <div className='flex justify-between items-center'>
      <div className='text-2xl font-bold'>가장 인기있는 포인트 🔥</div>
      <button className='bg-white text-white rounded-md p-3 font-bold' disabled>모두보기</button>
      </div>
      <div className='grid grid-cols-3 gap-4 py-2'>
      {stores
        .sort((a, b) => b.postLike - a.postLike)
        .slice(0, 3)
        .map((item) => {
          return <PointCard key={item.id} data={item} />;
        })}
        </div>
      <div className='text-2xl font-bold mt-10'>가장 최근에 등록된 포인트 🚀</div>
      <div className='grid grid-cols-3 gap-4 py-2'>
      {stores
        .sort((a, b) => b.id - a.id)
        .slice(0, 3)
        .map((item) => {
          return <PointCard key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};
export default PointsSection;
