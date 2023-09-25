import { Fragment } from "react";
import AddPostSection from "@/components/post/AddPostSection";
import HeaderComponent from "@/components/common/Header";

const AddPost = () => {
  return (
    <Fragment>
      <HeaderComponent />
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <AddPostSection />
      </main>
    </Fragment>
  );
};
export default AddPost;
