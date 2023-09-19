import Link from "next/link";
import { useState } from "react";
import { loginFetcher } from "../api/login";
import { useRouter } from "next/router";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setUserPassword] = useState("");
  const router = useRouter();
  const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginFetcher({ userId, password });
      if (response.status === 200) {
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.authorization_refresh;

        localStorage.setItem("authorization", accessToken);
        localStorage.setItem("authorization_refresh", refreshToken);

        alert("로그인 성공");
        router.push("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>로고</div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={userId}
            placeholder="아이디 :"
            onChange={onIdChange}
          />
          <input
            type="password"
            value={password}
            placeholder="비밀번호 :"
            onChange={onPwChange}
          />
          <button>로그인</button>
        </form>
        <Link href="/user/findPW">비밀번호 찾기 |</Link>
        <Link href="/user/findID">아이디 찾기 | </Link>
        <button>
          <Link href="/user/signup"> 회원가입</Link>
        </button>
        <br />
        <button>
          <Link href="/user/myinfo">마이페이지로</Link>
        </button>
      </div>
    </>
  );
}
