import React, { useEffect, useState } from "react";
import { Store } from "@/types/store";
import {
  FaRegCalendarAlt,
  FaRegCommentDots,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { likePost } from "@/pages/api/post/likePost";
import { useRouter } from "next/router";
import { deletePostAPI } from "@/pages/api/post/deletePost";
import { motion } from "framer-motion";
import MapSection from "./MapSection";
import FooterComponent from "../common/Footer";

interface Props {
  store: Store;
  userId: string;
}

type fullDateString = string;

export const ContentSection = ({ store, userId }: Props) => {
  const router = useRouter();
  const [time, setTime] = useState<string>();
  const [fishType, setFishType] = useState<string[]>([]);

  useEffect(() => {
    const fullDateString: fullDateString = store.createdTime;
    setTime(fullDateString?.split("T")[0]);

    const splitFishType = store.fishtype?.split(",");
    setFishType(splitFishType);
  }, [store.createdTime]);
  console.log(fishType);

  // 게시글 좋아요 기능 ( 서버 쪽 이슈 )
  const LikePost = () => {
    if (userId === "") {
      alert("로그인이 필요한 기능입니다!");
      router.push("/user/login");
      return;
    } else {
      const response = likePost(store.id);
    }
  };

  const UpdatePost = async () => {
    router.push(`/post/update/${store.id}`);
  };
  const DeletePost = async () => {
    const response = await deletePostAPI(store.id);
    if (response?.status === 200) {
      alert("게시글이 삭제되었습니다!");
      router.push("/community");
      return;
    } else {
      alert("API 통신에 에러가 발생하였습니다 💩");
    }
  };

  // box 효과
  const boxVariants = {
    start: {
      opacity: 0,
      scale: 0.8,
    },
    end: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.6,
      },
    },
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-[70px] w-full">
        <div className="">
          <MapSection location={store.coordinates} />
        </div>
        <div className="border p-4">
          <div className="flex gap-1 font-semibold text-2xl">
            <p className="text-blue-600">
              {store.accountId === "admin" ? (
                <>[ 포인트 ]</>
              ) : (
                <>[ 나만의 포인트 ]</>
              )}
            </p>
            {store.title}
          </div>
          <div className="mt-4 h-32 border overflow-y-auto rounded-md mb-[10px]">
            &nbsp;&nbsp;{store.contents}
          </div>
          <div className="flex items-center gap-2 text-gray-400 font-light">
            <FaRegCalendarAlt />
            등록일자 :&nbsp;{store.createdTime.split("T")[0]}
            {store.accountId === "admin" ? (
              <>
                <BsDot />
                <AiOutlineHeart /> 좋아요 수 {store.postLike}
                <BsDot />
                <FaRegCommentDots />
                댓글 {store.commentList.length}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center py-2 font-bold gap-2 border-b-2 mt-[5px]">
            <p className="text-blue-600 flex items-center gap-1">
              <FaMapMarkerAlt />
              주소
            </p>
            {store.locationdate}
          </div>
          <motion.div
            variants={boxVariants}
            initial="start"
            animate="end"
            className="flex justify-center gap-10 w-full text-center items-center h-[35%] bg-gradient-to-b from-white to-sky-500 rounded-md overflow-hidden"
          >
            {fishType.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  whileTap={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  drag
                  whileDrag="drag"
                  dragConstraints={{
                    top: 15,
                    bottom: -15,
                    left: 15,
                    right: -15,
                  }}
                  className="w-24 h-24 flex flex-col justify-center items-center rounded-full bg-sky-300 text-xl text-[white]"
                >
                  🐟<p>{item}</p>
                </motion.div>
              );
            })}

            {/* <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-blue-300">
                {store.category.name}
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </>
  );
};
