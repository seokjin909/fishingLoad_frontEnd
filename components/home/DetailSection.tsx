import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '../../hooks/useCurrentPoint';
import type { Store } from '../../types/store';

import DetailContent from './DetailContent';

const DetailSection = () => {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  return (
    <div
      className="border border-gray-300 flex justify-center w-[400px] h-[400px] items-center relative"
    >
      <DetailContent currentStore={currentStore} />
    </div>
  );
};
export default DetailSection;
