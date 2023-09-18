import { useCallback } from "react";
import { Store } from "../types/store";
import { mutate } from "swr";

export const STORE_KEY = "/stores";
export const USER_STORE_KEY = "/stores/userId";

const usePoints = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []);
  
  const initializeStoresUsers = useCallback((userStores: Store[]) => {
    mutate(USER_STORE_KEY, userStores);
  }, []);

  return {
    initializeStores,
    initializeStoresUsers
  };
};
export default usePoints;