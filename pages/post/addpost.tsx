import { Fragment } from "react";
import AddPostSection from "@/components/post/AddPostSection";


const AddPost = () => {
  return (
    <Fragment>
      <main className="h-[400px] container flex-wrap mx-auto flex justify-center items-center">
        <AddPostSection />
      </main>
    </Fragment>
  );
};
export default AddPost;
