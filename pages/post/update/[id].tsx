import { Fragment } from "react";
import UpdatePostSection from "@/components/post/UpdatePostSection";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { Store } from "@/types/store";

interface Props {
  store: Store;
}

const updatePost:NextPage<Props> = ({store}:Props) => {

  return (
    <Fragment>
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <UpdatePostSection store={store}/>
      </main>
    </Fragment>
  );
};
export default updatePost;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 백엔드 서버에서 상점 정보를 가져옵니다.
  const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${params?.id}`);
  const store = response.data; // 백엔드에서 받은 데이터를 사용합니다.

  return { props: { store } };
};