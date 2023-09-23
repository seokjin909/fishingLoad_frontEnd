import { useMemo } from "react";
import { useRouter } from "next/router";
import Map from "./Map";
import Markers from "./Markers";
import useMap, { INITIAL_ZOOM } from "../../hooks/useMap";
import useCurrentStore from "../../hooks/useCurrentPoint";
import type { NaverMap } from "../../types/map";
import type { Coordinates } from "../../types/store";

interface Props {
  location : Coordinates;
}
const MapSection = ({location}:Props) => {
  const router = useRouter();
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps

  /** onLoadMap */
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, "click", clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={11}
        initialCenter={location}
      />
      <Markers location={location}/>
    </>
  );
};
export default MapSection;
