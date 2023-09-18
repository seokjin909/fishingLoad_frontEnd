import useMap from "../../hooks/useMap";
import React from "react";
import Link from "next/link";
import useCurrentType from "@/hooks/useFilter";
import useSWR from "swr";
import { Type } from "@/types/type";
import { CURRENT_TYPE_KEY } from "@/hooks/useFilter"

const HomeHeader = () => {
  const { resetMapOptions } = useMap();
  const { setCurrentTypeSea, setCurrentTypeFreshWater } = useCurrentType();
  const { data: type } = useSWR<Type>(CURRENT_TYPE_KEY);
  if (!type) return null;
  return (
    <div className="h-10 flex justify-between items-center w-full absolute top-24 z-10 p-4">
        <Link
          href="/"
          onClick={resetMapOptions}
          className="p-1 border-none rounded-md bg-white"
          aria-label="홈으로 이동"
        >
          초기화
        </Link>
        <div className="flex justify-center items-center gap-2">
          {type > 1 ? (
          <><button className="bg-white p-2">바다</button><button onClick={() => setCurrentTypeSea()} className="p-2">민물</button></>) 
          : (<><button  onClick={() => setCurrentTypeFreshWater()} className="p-2">바다</button><button className="bg-white p-2">민물</button></>)}
        </div>
    </div>
  );
};
export default HomeHeader;

