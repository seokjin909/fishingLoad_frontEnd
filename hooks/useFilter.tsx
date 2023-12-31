import { useCallback } from "react";
import { mutate } from "swr";
import useCurrentStore from "./useCurrentPoint";

export const CURRENT_TYPE_KEY = "/current-type";

const useCurrentType = () => {
  const { clearCurrentStore } = useCurrentStore();

  // 바다 1번
  const setCurrentTypeSea = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 1);
    clearCurrentStore();
  }, [clearCurrentStore]);

  // 민물 2번
  const setCurrentTypeFreshWater = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 2);
    clearCurrentStore();
  }, [clearCurrentStore]);

  // 기본값은 바다
  const initializeTypes = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 1)
  },[]);

  return {
    setCurrentTypeSea,
    setCurrentTypeFreshWater,
    initializeTypes
  };
};
export default useCurrentType;
