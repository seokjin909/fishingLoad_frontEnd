import { useCallback } from "react";
import { mutate } from "swr";
import useCurrentStore from "./useCurrentPoint";

export const CURRENT_TYPE_KEY = "/current-type";

const useCurrentType = () => {
  const { clearCurrentStore } = useCurrentStore();

  const setCurrentTypeSea = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 1);
    clearCurrentStore();
  }, [clearCurrentStore]);

  const setCurrentTypeFreshWater = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 2);
    clearCurrentStore();
  }, [clearCurrentStore]);

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
