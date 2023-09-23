import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { Coordinates } from "../../types/store";
import { NaverMap } from "../../types/map";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../../hooks/useMap";


type Props = {
  mapId?: string;
  initialCenter: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = "map",
  initialCenter,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 6,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html */
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id={mapId} className="w-full h-[400px]">
      </div>
    </>
  );
};

export default Map;