import { Fragment } from "react";
import Header from "../../components/common/Header";
import AddPointSection from "@/components/addUserPoint/AddPointSection";


const AddPoint = () => {

  return (
    <Fragment>
      <Header />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <AddPointSection />
      </main>
    </Fragment>
  );
};
export default AddPoint;
