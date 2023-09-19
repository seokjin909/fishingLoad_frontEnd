import { useEffect, useState } from "react";
import { getMyInfo, getMyPage, modifierUser } from "../api/myinfo";
import { resign } from "../api/myinfo";

export default function MyInfo() {
  const [data, setData]: any = useState();
  const [page, setPage]: any = useState([]);

  // 게시글, 포인트 등록 정보
  const fetchInfo = async () => {
    try {
      const response = await getMyInfo();
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPage = async () => {
    try {
      const response = await getMyPage();
      setPage(response?.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInfo();
    fetchPage();
  }, []);

  // 회원 탈퇴
  const resignBtn = async () => {
    const response = await resign();
    alert(response.data.message);
  };

  // 회원정보 수정
  const modifierBtn = async () => {
    const response = await modifierUser(data);
    console.log(response);
  };
  return (
    <>
      <div>
        <div>
          <div>로고</div>
          <span>전국 포인트</span>
          <span>나만의 포인트</span>
          <span>커뮤니티</span>
          <br />
          <span>{data?.userId}</span>
          <button className="bg-gray-500">로그아웃</button>
        </div>
        <div>
          <div>
            <div>기본이미지</div>
          </div>
          <div>
            <span>닉네임</span>
            <span>{data?.nickname}</span>
            <button onClick={modifierBtn} className="bg-gray-500">
              회원수정
            </button>
            <button onClick={resignBtn} className="bg-red-500">
              탈퇴
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-1 grid-rows-2 bg-orange-300">
            <div className="flex justify-between">
              <span>제목</span>
              <span>작성자</span>
              <span>등록일</span>
              <span>좋아요</span>
            </div>
            <div>
              {page.map((item: any) => {
                return (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.contents}</span>
                    <span>{item.accountId}</span>
                    <span>{item.createdTime}</span>
                    <span>{item.postLike}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 grid-cols-1 grid-rows-2 bg-slate-400">
            <div>등록한 포인트</div>
            <div>
              <div className="flex justify-between">
                <span>이름</span>
                <span>위치</span>
                <span>등록일</span>
              </div>
              <div>
                {page.map((item: any) => {
                  return (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.title}</span>
                      <span>{item.locationdate}</span>
                      <span>{item.createdTime}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
