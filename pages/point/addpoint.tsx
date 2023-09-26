import { Fragment } from "react";
import AddPointSection from "@/components/addUserPoint/AddPointSection";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";

const AddPoint = () => {
  return (
    <Fragment>
      <HeaderComponent />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center mt-[70px]">
        <AddPointSection />
        <FooterComponent />
      </main>
    </Fragment>
  );
};
export default AddPoint;
