"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterComponent = () => {
  const footerText =
    "inline-block text-slate-500 border-none mb-[7px] ml-[7px] pr-[5px] border border-r-[#aaa] text-[0.95em] space-[-0.05em] leading-[1em]";
  return (
    <footer className="flex flex-col justify-center items-center mt-[50px] bg-white pb-[45px] w-[1200px]">
      <div className="mt-[30px] mb-[70px] w-[200px] flex justify-center items-center">
        <Link href="/" className="block h-[40px]">
          <Image src="/logo/fish.png" alt="logo" width={100} height={100} />
        </Link>
      </div>
      <div className="max-w-[800px] mx-auto text-center">
        <div className={footerText}>(주)피싱로드 대표이사 김붕어</div>
        <div className={footerText}>경기도 안산시 원선1로 10 1502호</div>
        <div className={footerText}>전화번호 : 010-0000-0000</div>
        <br />
        <div className={footerText}>사업자 등록번호 : 000-00-000000</div>
        <div className={footerText}>통신판매신고번호 : 000-00-00000</div>
        <div className={footerText}>개인정보관리책임자 : 김잉어</div>
      </div>
    </footer>
  );
};

export default FooterComponent;
