import { Fragment, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { Store } from "../../types/store";
import { CommunitySection } from "@/components/community/CommunitySection";
import CommunityHeader from "@/components/common/CommunityHeader";
import axios from "axios";
import PagingSection from "@/components/community/PagingSection";


const Community = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  
  useEffect(() => {
    const fetchData = async (page:number) => {
      try {
        const response = await axios.get(
          `http://3.39.195.241:8080/api/post/community?page=${page}&size=5&sortBy=createdTime&isAsc=false`,
          {withCredentials: true}
        );
        if (response.status === 200) {
          const data = response.data;
          setStores(data.content);
          setTotalPages(data.totalPages);
          setTotalItem(data.totalElements);
        } else {
          console.error("API 요청 실패");
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생", error);
      }
    };

    fetchData(page);
  }, [page]);

  return (
    <Fragment>
      <Header />
      <CommunityHeader />
      <main className="container mx-auto flex items-center flex-col">
        <CommunitySection data={stores} />
        <PagingSection setPage={setPage} page={page} totalPages={totalPages} totalItem={totalItem}/>
      </main>
    </Fragment>
  );
};

export default Community;
