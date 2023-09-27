import { NextPage } from "next";
import { Store } from "../../../types/store";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { ContentSection } from "@/components/pointdetail/ContentSection";
import { CommentSection } from "@/components/pointdetail/CommentSection";
import axios from "axios";
import { JwtPayload } from "jwt-decode";
import jwtDecode from "jwt-decode";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";
import ImageSection from "@/components/pointdetail/ImageSection";

interface Props {
  store: Store;
}

const DetailPoint: NextPage<Props> = () => {
  const router = useRouter();
  const [store, setStore] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authorization");
      if (token !== null) {
        const id: JwtPayload = jwtDecode<JwtPayload>(token);
        setUserId(id.sub as string);
      }

      // router.query.id를 통해 쿼리 파라미터에서 ID를 가져옴
      const idFromQuery = Number(router.query.id);

      if (!isNaN(idFromQuery)) {
        try {
          let response: any = "";
          if (token === null) {
            response = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${idFromQuery}`,
              { withCredentials: true },
            );
          } else {
            response = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${idFromQuery}`,
              {
                headers: {
                  Authorization: localStorage.getItem("authorization"),
                  Authorization_Refresh: localStorage.getItem(
                    "authorization_refresh",
                  ),
                },
                withCredentials: true,
              },
            );
          }
          if (response.status === 200) {
            setStore(response.data);
          } else {
            console.error("API 요청 실패");
          }
        } catch (error) {
          console.error("API 요청 중 오류 발생", error);
        }
      }
    };

    fetchData();
  }, [router.query.id]);

  const { isFallback } = useRouter();
  if (isFallback || store === null) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <HeaderComponent />
      <main className="container w-full flex-col mx-auto flex justify-center items-center">
        <ContentSection store={store} userId={userId} setStore={setStore} />
        <ImageSection store={store}/>
        {store.accountId === "admin" ? (
          <>
            <CommentSection comment={store.commentList} store={store} userId={userId} />
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