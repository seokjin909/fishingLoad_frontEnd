import React, { useEffect } from "react";
import useSWR from "swr";
import { MAP_KEY } from "../../hooks/useMap";
import { STORE_KEY } from "../../hooks/usePoint";
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from "../../hooks/useCurrentPoint";
import type { ImageIcon, NaverMap } from "../../types/map";
import type { Store } from "../../types/store";
import Marker from "./Marker";
import { Type } from "@/types/type";
import { CURRENT_TYPE_KEY } from "@/hooks/useFilter";

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);
  const { data: type } = useSWR<Type>(CURRENT_TYPE_KEY);
  const { setCurrentStore, clearCurrentStore } = useCurrentStore();

  useEffect(() => {
    return () => {
      clearCurrentStore();
    };
  }, [clearCurrentStore]);

  if (!map || !stores || !type ) return null;
  return (
    <>
      {stores.filter(item => item.category.id === type).map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates || [0,0]}
            icon={generateStoreMarkerIcon(store.category.id, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.id}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates || [0,0]}
          icon={generateStoreMarkerIcon(currentStore.category.id, true)}
          onClick={clearCurrentStore}
          key={currentStore.id}
        />
      )}
    </>
  );
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 2;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  type: number,
  isSelected: boolean,
): ImageIcon {
  return {
    url: isSelected ? '/images/markers-selected.png' : '/images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * (type-1), 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT,
    ),
  };
}
