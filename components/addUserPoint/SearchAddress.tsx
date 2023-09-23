'use client'
import Script from "next/script";
import React, { useEffect } from "react";
import DaumPostcode from "react-daum-postcode";



const Post = ({insertForm,setInsertForm}: any) => {
;

    const complete = async (data:any) =>{
		console.log(data);
		// console.log(coords);
		// const x = coords.getLng();
		// const y = coords.getLat();
		setInsertForm({ ...insertForm, locationdate : data.address, coordinates: [0,0]})
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