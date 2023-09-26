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
      className="border border-gray-300 flex flex-col w-[1200px] h-[530px] p-4"
    >
      <div className='text-2xl font-bold'>가장 인기있는 포인트 🔥</div>
      <div className='grid grid-cols-3 gap-4 py-2'>
      {stores.slice(0,3).sort((a,b)=>{
        const A = a.postLike;
        const B = b.postLike;
        return A-B;
      }).map((item) => {
        return <PointCard key={item.id} data={item} />
      }
        )}
        </div>
      <div className='text-2xl font-bold'>가장 최근에 등록된 포인트 🚀</div>
      <div className='grid grid-cols-3 gap-4 py-2'>
      {stores.slice(0,3).sort((a,b)=>{
        const A = a.id;
        const B = b.id;
        return A-B;
      }).map((item) => {
        return <PointCard key={item.id} data={item} />
      }
        )}
        </div>
    </div>
  );
};
export default PointsSection;
