import React, { useEffect, useState } from "react";
import { Store } from "@/types/store";
import {
  FaRegCalendarAlt,
  FaRegCommentDots,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {PiFishSimpleLight} from "react-icons/pi";
import { likePost } from "@/pages/api/post/likePost";
import { useRouter } from "next/router";
import { deletePostAPI } from "@/pages/api/post/deletePost";
import { motion } from "framer-motion";
import MapSection from "./MapSection";
import FooterComponent from "../common/Footer";
import MyModal from '../common/DeleteModal';
import { toast } from "react-toastify";

interface Props {
  store: Store;
  userId: string;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

type fullDateString = string;

export const ContentSection = ({ store, setStore, userId }: Props) => {
  console.log("ContextSection",store);
  const router = useRouter();
  const [time, setTime] = useState<string>();
  const [fishType, setFishType] = useState<string[]>([]);

  useEffect(() => {
    const fullDateString: fullDateString = store.createdTime;
    setTime(fullDateString?.split("T")[0]);

    const splitFishType = store.fishtype?.split(",");
    setFishType(splitFishType);
  }, [store.createdTime, store.fishtype]);

  const LikePost = async() => {
    if(userId === "") {
      toast.info('로그인이 필요한 서비스입니다.');
      router.push('/user/login');
      return;
    } else {
      const response = await likePost(store.id);
      console.log(response);
      if(response?.data.statusCode === 200) {
        const updatedStore = { ...store }; // store 객체를 복제합니다.
        if (store.postLikeUse) {
          // 이미 좋아요를 누른 상태였다면 감소
          updatedStore.postLike -= 1;
        } else {
          // 좋아요를 누르지 않은 상태였다면 증가
          updatedStore.postLike += 1;
        }
        updatedStore.postLikeUse = !store.postLikeUse; // 상태를 토글합니다.
        setStore(updatedStore);
      }
    }
  }

  const DeletePost = async () => {
    try {
      const response = await deletePostAPI(store.id);
      if (response?.status === 200) {
        toast.success("게시글이 삭제되었습니다");
        router.push("/point/mypoint");
        return;
      } 
    } catch (error) {
      console.log(error);
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
      <div className="grid grid-cols-2 gap-2 mt-[70px] w-[1200px]">
        <div className="">
          <MapSection location={store.coordinates} />
        </div>
        <div className="border p-4">
          <div className="flex gap-1 justify-between font-semibold text-2xl">
            <p className="text-blue-600">
              {store.accountId === "admin" ? (
                <>[ 포인트 ] {store.title}</>
              ) : (
                <>[ 나만의 포인트 ] {store.title}</>
              )}
            </p>
            {store.accountId === userId ? (<div><MyModal type='포인트' func={DeletePost}>삭제</MyModal></div>) : 
            (<div className='text-red-400 text-2xl cursor-pointer' onClick={LikePost}>
          {store.postLikeUse ? (<AiFillHeart />):(<AiOutlineHeart />)}
          </div>)}
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
                <AiOutlineHeart /> 좋아요 : {store.postLike}
                <BsDot />
                <PiFishSimpleLight />
                테마 : {store.category.name}
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
            className="flex justify-center gap-10 w-full text-center items-center h-[30%] bg-gradient-to-b from-white to-sky-500 rounded-md overflow-hidden"
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
