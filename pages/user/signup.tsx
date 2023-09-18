import { useRouter } from "next/router";
import { useState } from "react";
import { checkUserId, userSignUp } from "../api/signup";
export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [userVerifyPassword, setUserVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const admin = false;
  const adminToken = "A1234";
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;
    if (name === "userId") {
      setUserId(event.currentTarget.value);
      validateUserId(userId);
    }
    if (name === "userNickName") {
      setNickName(event.currentTarget.value);
      validateNickname(nickname);
    }
    if (name === "userPassword") {
      setPassword(event.currentTarget.value);
    }
    if (name === "userVerifyPassword") {
      setUserVerifyPassword(event.currentTarget.value);
    }
    if (name === "userEmail") {
      setEmail(event.currentTarget.value);
      validateEmail(email);
    }
  };
  function isValidUserId(userId: string) {
    const regex = /^[a-zA-Z0-9]{4,15}$/;
    return regex.test(userId);
  }
  function isValidPassword(password: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
  }
  function isValidNickname(nickname: string) {
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    return regex.test(nickname);
  }
  function isValidEmail(email: string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  const validateUserId = (userId: string) => {
    if (!isValidUserId(userId)) {
      setUserIdError("4-15자리, 대소문자와 숫자만 허용됩니다.");
    } else {
      setUserIdError("");
    }
  };
  const validatePassword = (password: string) => {
    if (!isValidPassword(password)) {
      setPasswordError(
        "8-20자리, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      );
    } else {
      setPasswordError("");
    }
  };
  // checkPw
  // const validateVerifyPassword = async () => {
  //   const response = await checkUserPw({ userId, password });
  //   try {
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const validateNickname = (nickname: string) => {
    if (!isValidNickname(nickname)) {
      setNicknameError("2-10자리, 특수문자는 사용할 수 없습니다.");
    } else {
      setNicknameError("");
    }
  };

  const validateEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인하세요");
    } else {
      setEmailError("");
    }
  };
  const checkBtn = async () => {
    const response = await checkUserId({ userId, email });
    try {
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      if (error) {
        alert(response.data.message);
      }
    }
  };
  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // 모든 필드에 대한 유효성 검사를 추가
    validateUserId(userId);
    validatePassword(password);
    validateNickname(nickname);
    validateEmail(email);

    // 모든 필드가 유효한지 확인
    if (userIdError || passwordError || nicknameError || emailError) {
      alert("입력값을 다시 확인하세요"); // 하나라도 유효하지 않으면 제출을 중지합니다.
    }
    if (userVerifyPassword === password) {
      try {
        const response = await userSignUp({
          userId,
          password,
          nickname,
          email,
          admin,
          adminToken,
        });
        console.log(response);
        if (response.status === 200) {
          alert(response.data.message);
          router.push("/user/login");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("비밀번호를 확인하세요");
    }
  };

  return (
    <>
      <div>로고</div>
      <div>
        <form>
          <label>아이디 : </label>
          <input
            type="text"
            value={userId}
            onChange={onChange}
            name="userId"
            required
          />

          <button type="button" onClick={checkBtn}>
            중복확인
          </button>
          <br />
          <span>{userIdError}</span>
          <br />
          <label>닉네임 : </label>
          <input
            type="text"
            value={nickname}
            onChange={onChange}
            name="userNickName"
            required
          />
          <br />
          <span>{nicknameError}</span>
          <br />
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            onChange={onChange}
            name="userPassword"
            required
          />
          <br />
          <span>{passwordError}</span>
          <br />
          <label>비밀번호 확인 : </label>
          <input
            type="password"
            value={userVerifyPassword}
            onChange={onChange}
            name="userVerifyPassword"
            required
          />
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            onChange={onChange}
            name="userEmail"
            required
          />
          <br />
          <span>{emailError}</span>
          <br />
          <button onClick={onSubmit}>가입하기</button>
        </form>
      </div>
    </>
  );
}
