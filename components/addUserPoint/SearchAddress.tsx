/* eslint-disable */
'use client'
import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";


const Post = ({insertForm,setInsertForm}: any) => {
    const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
    const kakaoMapGeoCoder = (address:any) => {  
        window.kakao.maps.load(() => {
            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function (result:any, status:any) {
                // 정상적으로 검색이 완료됐으면
                if (status === window.kakao.maps.services.Status.OK) {
                    setInsertForm((prev:any) => {
                        return {
                            ...prev,
                            coordinates: [
                                Number(result[0].y),Number(result[0].x),
                            ],
                        };
                    });
                }
            });
        });
    };

    const complete = async (data:any) =>{
        kakaoMapGeoCoder(data.address);
		setInsertForm({ ...insertForm, locationdate : data.address})
    }

    const handleClick = () => {
        open({ onComplete: complete });
      };
    return (
        <button className="bg-blue-500 text-white rounded-md py-1 px-3 font-bold transition-all hover:bg-blue-600 w-28" onClick={handleClick}>주소 검색</button>
    );
};

export default Post;