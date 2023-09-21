"use client";

import { useState } from "react";
import { changePw } from "../api/changePw";
import { useRouter } from "next/router";
import { isValidPassword } from "../api/validation";

export default function ChangePW() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const validatePassword = (password: string) => {
    if (!isValidPassword(password)) {
      setPasswordError(
        "8-20자리, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      );
      alert("비밀번호를 확인하세요");
      // throw new Error("")
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = validatePassword(password);
    if (!value) return;

    const response = await changePw({ password });
    if (response?.status === 200) {
      alert("변경된 비밀번호로 로그인하세요");
      router.push("/user/login");
    } else {
      alert(response);
    }
  };
  return (
    <>
      <div className="mb-[34px] clear-both max-w-[1200px] mx-auto">
        <div className="mb-[40px] mt-[70px] text-center">
          <form onSubmit={onSubmit}>
            <div>
              <div className="mb-[20px]">
                <ul className="table w-full list-none">
                  <li className="pl-[0px] pr-[5px] table-cell align-top list-none">
                    <div className="pt-[5px] pb-[10px] leading-[1.6]">
                      <h5 className="text-[14px] font-semibold text-[#444]">
                        비밀번호 변경하기
                      </h5>
                      <p className="text-[#444]">
                        새로운 비밀번호로 변경하세요.
                      </p>
                    </div>
                    <div className="table w-full h-[200px] py-[20px] text-center bg-[#f7f7f7]">
                      <div className="table-cell align-middle text-center">
                        <dl className="table mx-auto text-center list-none">
                          <dd className="table-cell pl-[20px] text-left list-none">
                            <table className="border-none border-collapse w-100%">
                              <colgroup className="box-border table-column-group">
                                <col className="w-[50%] table-column"></col>
                                <col className="table-column"></col>
                              </colgroup>
                              <tbody className="box-border table-row-group align-middle border-inherit">
                                <tr>
                                  <th className="pb-[5px] text-left font-normal border-none">
                                    새로운 비밀번호 &nbsp;
                                  </th>
                                  <td className="pb-[8px] border-none">
                                    <input
                                      className="w-[155px] h-[32px] px-[5px] leading-[3px] text-[#696F74] align-middle bg-[#fefefe] border border-[#e2e2e2] rounded-[3px] shadow-md"
                                      type="password"
                                      value={password}
                                      onChange={onChange}
                                    />
                                    &nbsp; &nbsp; &nbsp;
                                    <span className="text-[10px] text-red-500 font-semibold">
                                      {passwordError}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </dd>
                          <dd className="table-cell pl-[20px] text-left">
                            <button className="min-w-[80px] py-[4px] px-[10px] text-[14px] border border-[#58668d] bg-[#6f7b9c] text-[#fff]">
                              변경하기
                            </button>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
