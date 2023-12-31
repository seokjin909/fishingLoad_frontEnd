/* eslint-disable */
import { Fragment, useEffect, useState } from "react";
import { Store } from "../../types/store";
import useStores from "../../hooks/usePoint";
import DetailSection from "@/components/userPoint/DetailSection";
import PointsSection from "@/components/userPoint/PointsSection";
import { getUserPoint } from "../api/point/getUserPoint";
import UserMapSection from "../../components/userPoint/MapSection";
import NoMarkerMapSection from "@/components/userPoint/NoMarkerMapSection";
import { useRouter } from "next/router";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";
import { toast } from "react-toastify";

const Home = () => {
  const { initializeStores } = useStores();
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>();

  const GetUserPoints = async () => {
    try {
      const response = await getUserPoint();
      console.log(response);
      if (!response?.data) {
        setStores([]);
        initializeStores([]);
      } else {
        setStores(response.data.posts);
        initializeStores(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (token === null || "") {
      toast.info('로그인이 필요한 서비스입니다.');
      router.push("/user/login");
      return;
    }
    GetUserPoints();
  }, []);

  return (
    <Fragment>
      <HeaderComponent />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center mt-[70px]">
        {stores?.length === 0 || stores === undefined ? (
          <>
            <NoMarkerMapSection />
            <DetailSection state={false} />
          </>
        ) : (
          <>
            <UserMapSection stores={stores} />
            <DetailSection state={true} />
          </>
        )}
        <PointsSection />
        <FooterComponent />
      </main>
    </Fragment>
  );
};
export default Home;
