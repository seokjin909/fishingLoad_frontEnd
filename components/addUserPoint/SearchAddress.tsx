/* eslint-disable */
'use client'
import React, { useEffect } from "react";
import DaumPostcode from "react-daum-postcode";




const Post = ({insertForm,setInsertForm}: any) => {
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
    return (
        <div >
            <DaumPostcode
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default Post;