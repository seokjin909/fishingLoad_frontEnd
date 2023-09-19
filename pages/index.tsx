import { Fragment, useEffect } from "react";
import { NextPage } from "next";
import Header from "../components/common/Header";
import MapSection from "../components/home/MapSection";
import { Store } from "../types/store";
import useStores from "../hooks/usePoint";
import HomeHeader from "@/components/home/Header";
import DetailSection from "@/components/home/DetailSection";
import useCurrentType from "@/hooks/useFilter";
import PointsSection from "@/components/home/PointsSection";

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();
  const { initializeTypes } = useCurrentType();

  useEffect(() => {
    initializeStores(stores);
    initializeTypes();
  }, [initializeStores,initializeTypes,stores]);

  return (
    <Fragment>
      <Header />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <HomeHeader />
        <MapSection />
        <DetailSection />
        <PointsSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  const stores = (await import("../public/stores.json")).default;

  return {
    props: { stores },
    revalidate: 5,
  };
}
