import { Fragment } from "react";
import { NextPage } from "next";
import Header from "../../components/common/Header";
import { Store } from "../../types/store";
import { CommunitySection } from "@/components/community/CommunitySection";



interface Props {
  stores: Store[];
}

const Community : NextPage<Props> = ({ stores }) => {
    console.log(stores);
  return (
    <Fragment>
      <Header />
      <main className="container mx-auto flex justify-center items-center flex-col">
        <div className="text-2xl mb-4">커뮤니티 영역</div>
        <CommunitySection data={stores}/>
      </main>
    </Fragment>
  );
};
export default Community;

export async function getStaticProps() {
  const data = (await import("../../public/stores.json")).default;
  const stores = data.filter(item => item.category.id === 3);

  return {
    props: { stores },
    revalidate: 5,
  };
}
