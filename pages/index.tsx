import { Fragment, useEffect } from "react";
import { NextPage } from "next";
import Header from "../components/common/Header";
import MapSection from "../components/home/MapSection";
import { Store } from "../types/store";
import useStores from "../hooks/usePoint";
import HomeHeader from "@/components/home/Header";
import DetailSection from "@/components/home/DetailSection";

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <Header />
      <main className="w-full h-full items-center flex flex-col mt-10">
        <HomeHeader />
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const stores = (await import("../public/stores.json")).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
