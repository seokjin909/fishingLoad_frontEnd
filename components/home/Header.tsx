import useMap from "../../hooks/useMap";
import React from "react";
import Link from "next/link";
import SwitchToggle from "./Switch";


const HomeHeader = () => {
  const { resetMapOptions } = useMap();

  return (
    <div className="h-10 flex justify-between items-center w-full absolute top-24 z-10 p-4">
        <Link
          href="/"
          onClick={resetMapOptions}
          className="p-1 border-none rounded-md bg-white"
          aria-label="홈으로 이동"
        >
          처음으로
        </Link>
        <SwitchToggle />
    </div>
  );
};
export default HomeHeader;

