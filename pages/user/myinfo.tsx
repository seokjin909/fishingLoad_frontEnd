import { useEffect, useState } from "react";
import { getMyPage } from "../api/mypage";

export default function MyInfo() {
  const [data, setData] = useState({});
  useEffect(() => {
    getMyPage().then((res: any) => {
      console.log(data);
      setData(res);
      console.log(data);
    });
  }, []);
  return (
    <>
      <div>
        <div>
          <div>로고</div>
          <span>전국 포인트</span>
          <span>나만의 포인트</span>
          <span>커뮤니티</span>
          <span>유저 이름</span>
          <button>로그아웃</button>
        </div>
        <div>
          <div>
            <div>기본이미지</div>
          </div>
          <div>
            <span>닉네임 : </span>
            <button>회원수정</button>
            <button>탈퇴</button>
          </div>
        </div>
        <div>
          <div>
            <div>
              <span>제목</span>
              <span>작성자</span>
              <span>등록일</span>
              <span>좋아요</span>
            </div>
            <div>게시글 내용</div>
          </div>
          <div>등록한 포인트</div>
          <div>
            <div>
              <span>이름</span>
              <span>위치</span>
              <span>등록일</span>
            </div>
            <div>게시글 내용</div>
          </div>
        </div>
      </div>
    </>
  );
}
