import { Fragment } from "react";
import AddPointSection from "@/components/addUserPoint/AddPointSection";
import HeaderComponent from "@/components/common/Header";


const AddPoint = () => {

  return (
    <Fragment>
      <HeaderComponent />
      <main className="h-[400px] flex-wrap mx-auto flex justify-center items-center">
        <AddPointSection />
      </main>
    </Fragment>
  );
};
export default AddPoint;
