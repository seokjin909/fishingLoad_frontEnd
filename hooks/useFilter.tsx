import { useCallback } from "react";
import { mutate } from "swr";

export const CURRENT_TYPE_KEY = "/current-type";

const useCurrentType = () => {
  const setCurrentTypeSea = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 1);
  }, []);

  const setCurrentTypeFreshWater = useCallback(() => {
    mutate(CURRENT_TYPE_KEY, 2);
  }, []);

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
