import { NextPage } from "next";
import { Store } from "../../../types/store";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { ContentSection } from "@/components/postdetail/ContentSection";
import { CommentSection } from "@/components/postdetail/CommentSection";
import axios from "axios";
import { JwtPayload } from "jwt-decode";
import jwtDecode from "jwt-decode";
import useSWR from "swr";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";

interface Props {
  store: Store;
}

const DetailPoint: NextPage<Props> = () => {
  const router = useRouter();
  const [stores, setStores] = useState<any>(null);
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
          console.log(response);
          if (response.status === 200) {
            setStores(response.data);
          } else {
            console.error("API 요청 실패");
          }
        } catch (error) {
          console.error("API 요청 중 오류 발생", error);
        }
      }
    };

    fetchData();
  }, [router.query.id, userId]);

  const { isFallback } = useRouter();
  if (isFallback || stores === null) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <HeaderComponent />
      <main className="container w-[1200px] flex-col mx-auto flex justify-center items-center mt-[80px]">
        <ContentSection store={stores} userId={userId} setStore={setStores} />
        <CommentSection
          comment={stores.commentList}
          store={stores}
          userId={userId}
        />
        <FooterComponent />
      </main>
    </Fragment>
  );
};

export default DetailPoint;
