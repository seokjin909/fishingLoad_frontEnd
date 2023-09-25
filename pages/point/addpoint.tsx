import { Fragment } from "react";
import AddPointSection from "@/components/addUserPoint/AddPointSection";


const AddPoint = () => {

  return (
    <Fragment>
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <AddPointSection />
      </main>
    </Fragment>
  );
};
export default AddPoint;
