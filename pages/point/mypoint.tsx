import { Fragment, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/common/Header";
import { Store } from "../../types/store";
import useStores from "../../hooks/usePoint";
import DetailSection from "@/components/userPoint/DetailSection";
import PointsSection from "@/components/userPoint/PointsSection";
import { getUserPoint } from "../api/point/getUserPoint";
import UserMapSection from "../../components/userPoint/MapSection";
import NoMarkerMapSection from "@/components/userPoint/NoMarkerMapSection";

const Home = () => {

  const { initializeStores } = useStores();
  const [stores, setStores] = useState<Store[]>();
  
  const GetUserPoints = async() => {
    try{
      const response = await getUserPoint();
      console.log(response);
      if(!response?.data) {
        setStores([]);
        initializeStores([]);
      } else {
        setStores(response.data.post);
        initializeStores(response.data.post);
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    GetUserPoints();
  }, []);

  return (
    <Fragment>
      <Header />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        {stores?.length === 0 || stores === undefined ? 
        (
          <>
            <NoMarkerMapSection />
            <DetailSection state={false} />
          </>
        ) : 
        (
          <>
        <UserMapSection stores={stores}/>
        <DetailSection state={true}/>
        </>
        )}
        <PointsSection />
      </main>
    </Fragment>
  );
};
export default Home;
