import useMap from "../../hooks/useMap";
import React from "react";
import Link from "next/link";
import useCurrentType from "@/hooks/useFilter";
import useSWR from "swr";
import { Type } from "@/types/type";
import { CURRENT_TYPE_KEY } from "@/hooks/useFilter"
import { RxReset } from "react-icons/rx"

const PILL_BUTTON = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full opacity-50 cursor-not-allowed";
const NOT_PILL_BUTTON = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-full"
const HomeHeader = () => {
  const { resetMapOptions } = useMap();
  const { setCurrentTypeSea, setCurrentTypeFreshWater } = useCurrentType();
  const { data: type } = useSWR<Type>(CURRENT_TYPE_KEY);
  if (!type) return null;
  return (
    <div className="h-14 flex justify-between items-center w-[810px] absolute top-20 left-[350px] z-10 p-4">
        <Link
          href="/"
          onClick={resetMapOptions}
          className="p-1 border-none rounded-md bg-white"
          aria-label="홈으로 이동"
        >
          <RxReset />
        </Link>
        <div className="flex justify-center items-center gap-2 font-semibold">
          {type > 1 ? (
          <><button className={PILL_BUTTON}>Sea 🎣</button><button onClick={() => setCurrentTypeSea()} className={NOT_PILL_BUTTON}>FreshWater 🐟</button></>) 
          : (<><button  onClick={() => setCurrentTypeFreshWater()} className={NOT_PILL_BUTTON}>Sea 🎣</button><button className={PILL_BUTTON}>FreshWater 🐟</button></>)}
        </div>
    </div>
  );
};
export default HomeHeader;

