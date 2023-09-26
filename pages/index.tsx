import { Fragment, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import MapSection from "../components/home/MapSection";
import { Store } from "../types/store";
import useStores from "../hooks/usePoint";
import DetailSection from "@/components/home/DetailSection";
import useCurrentType from "@/hooks/useFilter";
import PointsSection from "@/components/home/PointsSection";
import { getPoint } from "./api/point/getPoint";
import HeaderComponent from "@/components/common/Header";

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }: Props) => {
  const { initializeStores } = useStores();
  const { initializeTypes } = useCurrentType();

  useEffect(() => {
    initializeStores(stores);
    initializeTypes();
  }, [initializeStores, initializeTypes, stores]);

  return (
    <Fragment>
      <HeaderComponent />
      <main className="h-[400px] flex-wrap mx-auto flex justify-center items-center mt-[70px]">
        <MapSection />
        <DetailSection />
        <PointsSection />
      </main>
    </Fragment>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getPoint();
  const stores = response;

  return { props: { stores } };
};
