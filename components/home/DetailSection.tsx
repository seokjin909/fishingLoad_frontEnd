import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '../../hooks/useCurrentPoint';
import type { Store } from '../../types/store';

import DetailContent from './DetailContent';

const DetailSection = () => {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  return (
    <div
      className="p-4 border border-gray-300 w-full flex justify-center"
    >
      <DetailContent currentStore={currentStore} />
    </div>
  );
};
export default DetailSection;
