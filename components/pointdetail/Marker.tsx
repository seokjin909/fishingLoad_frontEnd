import { useEffect } from "react";
import type { Marker } from "../../types/map";

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new window.naver.maps.Marker({
        map: map,
        position: new window.naver.maps.LatLng(...coordinates),
        icon,
      });
    }

    if (onClick) {
      window.naver.maps.Event.addListener(marker, "click", onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Marker;
