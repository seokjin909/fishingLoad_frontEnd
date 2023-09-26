import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { Store } from "../../../types/store";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { ContentSection } from "@/components/pointdetail/ContentSection";
import { CommentSection } from "@/components/pointdetail/CommentSection";
import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";

interface Props {
  store: Store;
}

const DetailPoint: NextPage<Props> = ({ store }) => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (token !== null) {
      const id: JwtPayload = jwtDecode<JwtPayload>(token ? token : "");
      setUserId(id.sub as string);
    }
  }, []);

  const { isFallback } = useRouter();
  if (isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Fragment>
      <HeaderComponent />
      <main className="max-w-[1200px] flex-wrap mx-auto flex justify-center">
        <ContentSection store={store} userId={userId} />
        {store.accountId === "admin" ? (
          <>
            <CommentSection
              comment={store.commentList}
              store={store}
              userId={userId}
            />
            <FooterComponent />
          </>
        ) : (
          <>
            <FooterComponent />
          </>
        )}
      </main>
    </Fragment>
  );
};
export default DetailPoint;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 백엔드 서버에서 상점 정보를 가져옵니다.
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${params?.id}`,
  );
  const store = response.data; // 백엔드에서 받은 데이터를 사용합니다.

  return { props: { store } };
};
