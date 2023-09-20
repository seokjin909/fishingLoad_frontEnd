import { Fragment } from "react";
import { NextPage } from "next";
import Header from "../../components/common/Header";
import { Store } from "../../types/store";
import { CommunitySection } from "@/components/community/CommunitySection";
import CommunityHeader from "@/components/common/CommunityHeader";



interface Props {
  stores: Store[];
}

const Community : NextPage<Props> = ({ stores }) => {
  return (
    <Fragment>
      <Header />
      <CommunityHeader />
      <main className="container mx-auto flex items-center flex-col">
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
