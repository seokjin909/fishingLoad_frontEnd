import { Fragment, useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import MapSection from "../../components/userPoint/MapSection";
import { Store } from "../../types/store";;
import HomeHeader from "@/components/userPoint/Header";
import DetailSection from "@/components/userPoint/DetailSection";
import HeaderComponent from "@/components/common/Header";
import usePoints from "../../hooks/usePoint";

interface Props {
  userStores: Store[];
}

const HomeUser : NextPage<Props> = ({ userStores }) => {
  const { initializeStoresUsers } = usePoints();

  useEffect(() => {
    initializeStoresUsers(userStores);
  }, [initializeStoresUsers, userStores]);

  return (
    <Fragment>
      <HeaderComponent />
      <main className="w-full h-full items-center flex flex-col mt-10">
        <HomeHeader />
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default HomeUser;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../../public/user-stores.json')).default;
  const paths = stores.map((store) => ({ params: { userId: store.userId } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../../public/user-stores.json')).default;
  const userStores = stores.filter((store) => store.userId === params?.userId);
  return { props: { userStores } };
};

