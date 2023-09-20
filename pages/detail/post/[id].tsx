import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Store } from "../../../types/store";
import { useRouter } from "next/router";
import { Fragment } from "react";
import HeaderComponent from "../../../components/common/Header";
import { ContentSection } from "@/components/postdetail/ContentSection";
import { CommentSection } from "@/components/postdetail/CommentSection";
import CommunityHeader from "@/components/common/CommunityHeader";

interface Props {
    store: Store;
}

const DetailPoint : NextPage<Props> = ({ store }) => {
    const { isFallback } = useRouter();
    if(isFallback) {
      return <div>Loading...</div>;
    }
  return (
    <Fragment>
      <HeaderComponent />
      <CommunityHeader />
      <main className="container w-full flex-col mx-auto flex justify-center items-center">
        <ContentSection store={store}/>
        <CommentSection comment={store.commentList}/>
      </main>
    </Fragment>
  );
};
export default DetailPoint;

export const getStaticPaths: GetStaticPaths = async () => {
    const stores = (await import('../../../public/stores.json')).default;
    const paths = stores.map((store) => ({ params: { id : store.id.toString()}}));
  
    return { paths, fallback: false };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const stores = (await import("../../../public/stores.json")).default;
    const store = stores.find((store) => store.id === Number(params?.id));
  
    return { props: { store } };
  };