import React from "react";
import useSWR from "swr";
import { MAP_KEY } from "../../hooks/useMap";
import { STORE_KEY } from "../../hooks/usePoint";
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from "../../hooks/useCurrentPoint";
import type { ImageIcon, NaverMap } from "../../types/map";
import type { Coordinates, Store } from "../../types/store";
import Marker from "./Marker";
import { Type } from "@/types/type";
import { CURRENT_TYPE_KEY } from "@/hooks/useFilter";

interface Props {
  location : Coordinates;
}

const Markers = ({location}:Props) => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);


  if (!map) return null;
  return (
    <>
      <Marker
        map={map}
        coordinates={location}
        icon={generateStoreMarkerIcon()}
        key={location[0]}
      />
    </>
  )
};
export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 2;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(): ImageIcon {
  return {
    url: 'images/markers-selected.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * 1, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT,
    ),
  };
}
