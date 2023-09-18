import Link from "next/link";
import { useState } from "react";
import { findId } from "./../api/find";

export default function findUserId() {
  const [email, setEmail] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await findId({ email });
    try {
      alert(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChange}
          />
          <button>찾기</button>
        </form>
        {/* <div><span>{response.data.userId }</span></div> */}
        <Link href="/user/login">로그인 페이지로</Link>
      </div>
    </>
  );
}
