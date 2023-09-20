import { useState } from "react";
import { changePw } from "../api/changePw";
import { useRouter } from "next/router";

export default function changePW() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await changePw({ password });
      if (response.status === 200) {
        alert("변경된 비밀번호로 로그인하세요");
        setPassword("");
        router.push("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label>
            변경할 비밀번호 : &nbsp;
            <input type="password" value={password} onChange={onChange} />
          </label>
          <button>변경하기</button>
        </form>
      </div>
    </>
  );
}
