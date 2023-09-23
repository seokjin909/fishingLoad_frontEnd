import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Store } from "../../../types/store";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import HeaderComponent from "../../../components/common/Header";
import { ContentSection } from "@/components/pointdetail/ContentSection";
import { CommentSection } from "@/components/pointdetail/CommentSection";
import CommunityHeader from "@/components/common/CommunityHeader";
import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Props {
    store: Store;
}

const DetailPoint : NextPage<Props> = ({ store }) => {

  const [userId, setUserId] = useState<string>("");
    useEffect(()=> {
        const token = localStorage.getItem('authorization');
        if(token !== null) {
            const id:JwtPayload = jwtDecode<JwtPayload>(token ? token : "");
            setUserId(id.sub as string);
        } 
    },[])

    const { isFallback } = useRouter();
    if(isFallback) {
      return <div>Loading...</div>;
    }
  return (
    <Fragment>
      <HeaderComponent />
      <main className="container flex-wrap mx-auto flex justify-center">
        <ContentSection store={store} userId={userId}/>
        <CommentSection comment={store.commentList} store={store} userId={userId}/>
      </main>
    </Fragment>
  );
};
export default DetailPoint;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 백엔드 서버에서 상점 정보를 가져옵니다.
  const response = await axios.get(`http://3.39.195.241:8080/api/post/${params?.id}`);
  const store = response.data; // 백엔드에서 받은 데이터를 사용합니다.

  return { props: { store } };
};
